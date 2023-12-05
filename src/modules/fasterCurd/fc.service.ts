import { Injectable, Logger } from '@nestjs/common'
import { HttpAdapterHost } from '@nestjs/core'
import { Express } from 'express'
import express = require('express')
import { ConfigCtx } from './fc.decorators'
import {
  BEFORE_ACTION_SUM_TOKEN,
  FCRUD_GEN_CFG_TOKEN,
  FIELDS_TOKEN,
  IGNORE_FIEIDS_TOKEN,
} from './backend/fc.tokens'
import { CRUDMethod, HttpMethods } from './backend/decl/base.decl'
import { ENTITY_NAME_TOKEN, GEN_CRUD_METHOD_TOKEN } from './backend/fc.tokens'
import { getProtoMeta } from '../../utils/reflect.utils'
import { defaultCrudMethod } from './backend/decl/base.decl'
import {
  CheckerType,
  IGNORE_ME,
  TransformerType,
  post_transformer_factories,
  after_transformer,
} from './backend/fragments'
import { FCrudJwtMiddleware } from './middleware/jwt.middleware'
import { fixRoute } from 'src/utils/utils'
import {
  checker_factories,
  pre_transformer_factories,
} from './backend/fragments'
import { exceptionMiddleware } from './middleware/exception.middleware'
import { ObjectLiteral } from './crud-gen/fast-crud.decl'
import { log } from 'src/utils/debug'
import { Router } from 'express'
import {
  AddReq,
  DelReq,
  EditReq,
  PageQuery,
  PageRes,
} from './crud-gen/fast-crud.decl'
import { LabeledActionOptions } from './backend/decl/action.decl'
const logger = new Logger('FasterCRUDService')
const POST: HttpMethods = 'post'
@Injectable()
export class FasterCrudService {
  prefix = `/dt-api`

  constructor(
    private readonly adapterHost: HttpAdapterHost,
    private readonly fCrudJwtMiddleware: FCrudJwtMiddleware
  ) {
    this.app.use(express.json())

    logger.debug(
      `FasterCrudService created, attaching to ${this.adapterHost.httpAdapter.getType()}`
    )
  }

  addRouter(route: string, router: express.Router) {
    router.stack.forEach((r) => {
      if (r.route && r.route.path) {
        logger.debug(
          `Mapped {${route}${
            r.route.path
          }}, ${r.route.stack[0].method.toUpperCase()}} route`
        )
      }
    })
    this.app.use(route, router)
  }

  generateCRUD<T extends abstract new (...args: any) => InstanceType<T>>(
    target: T,
    provider: CRUDProvider<InstanceType<T>>
  ) {
    const { dict, fcrudName, fields } = this.parseEntityMeta(target)

    const router = new RouterBuilder()
      .addPreMiddlewares(this.fCrudJwtMiddleware.FcrudJwtMiddleware)
      .addPostMiddlewares(exceptionMiddleware)

    const baseMethods: CRUDMethod[] =
      getProtoMeta(target, GEN_CRUD_METHOD_TOKEN) ?? defaultCrudMethod
    const options: { [action: string]: LabeledActionOptions<T> } = getProtoMeta(
      target,
      BEFORE_ACTION_SUM_TOKEN
    )
    // merge base methods
    this.merge(baseMethods, options)
    console.log(options)
    const docs: any = { crud: {}, dict }
    for (const action of Object.keys(options)) {
      const option: LabeledActionOptions<T> = options[action]
      const method: CRUDMethod = option.method
      const query = provider[method].bind(provider)

      const cfg: ConfigCtx<T> = { option, target, fields, action }
      const decoratedMethod = this.configureMethod(cfg, query)

      const route = fixRoute(option?.route_override ?? `/${action}`)
      router.setRoute(POST, route, async function (req, res) {
        await perform_task(req, decoratedMethod, res)
      })
      docs.crud[action] = `/${fcrudName}${route}`
    }

    router.setRoute('get', `/docs`, async function (req, res) {
      res.status(200).json(docs)
    })

    this.addRouter(`${this.prefix}/${fcrudName}`, router.build())
  }

  private merge<T extends abstract new (...args: any) => InstanceType<T>>(
    baseMethods: CRUDMethod[],
    options: { [action: string]: LabeledActionOptions<T> }
  ) {
    for (const method of baseMethods) {
      if (!options[method]) {
        options[method] = {
          method,
          action: method,
        }
      }
    }
  }

  private parseEntityMeta<T extends ObjectLiteral>(entity: T) {
    const fcrudName = (
      getProtoMeta(entity, ENTITY_NAME_TOKEN) ?? entity.name
    ).toLowerCase()
    const fields = getProtoMeta(entity, FIELDS_TOKEN) ?? {}
    const ignored = getProtoMeta(entity, IGNORE_FIEIDS_TOKEN) ?? []
    // TODO clean this
    // console.log(ignored)
    // remove ignored fields
    if (ignored && Array.isArray(ignored) && fields) {
      for (const field of ignored) {
        delete fields[field]
      }
    }
    const dict = getProtoMeta(entity, FCRUD_GEN_CFG_TOKEN) ?? {}

    return { dict, fcrudName, fields }
  }

  configureMethod<T extends ObjectLiteral>(
    cfg: ConfigCtx<T>,
    method: (data: any) => Promise<any>
  ) {
    if (!cfg || !cfg.option) {
      throw new Error(`options is not defined`)
    }

    const {
      checkers,
      pre_transformers,
      post_transformers,
      hooks,
      transform_after,
    } = this.parseOptions(cfg)
    return async (data: any) => {
      try {
        await this.hooked(
          data,
          (d) => applyCheckers(checkers, d),
          hooks.onCheckFailure
        )
        
        // data = applyTransformers(pre_transformers, data)
        await this.hooked(
          data,
          (d) => applyTransformers(pre_transformers, d),
          hooks.onTransformFailure
        )

        log(`exec with data:`, data)

        let queryResult = await this.hooked(data, method, hooks.onExecFailure)

        log(`exec result:`, queryResult)

        queryResult = await this.hooked(
          queryResult,
          (d) => applyTransformers(post_transformers, d),
          hooks.onPostTransformFailure
        )

        log(`transformed result:`, queryResult)

        const after = transform_after(data, queryResult)
        await hooks.onSuccess?.(after)

        log(`transformed after:`, after)
        return after
      } catch (e) {
        logger.error(`error when executing method ${method.name}:`, e)
        throw new Error(e.message)
      }
    }
  }

  private async hooked(
    data: any,
    action: ((data:any) => any) | ((data:any) => Promise<any>),
    hook: (data: any) => any
  ) {
    try {
      return await action(data)
    } catch (e) {
      if (hook) {
        hook(data)
      }
      throw e
    }
  }

  private parseOptions(ctx: ConfigCtx) {
    let [checkers, pre_transformers, post_transformers] = [
      checker_factories,
      pre_transformer_factories,
      post_transformer_factories,
    ].map(
      (fs) => fs.map((f) => f(ctx)).filter((item) => item !== IGNORE_ME)
      // get all products, and filter out empty ones
    )

    const hooks = {
      onCheckFailure: ctx.option.onCheckFailure,
      onTransformFailure: ctx.option.onPreTransformFailure,
      onExecFailure: ctx.option.onExecFailure,
      onPostTransformFailure: ctx.option.onPostTransformFailure,
      onSuccess: ctx.option.onSuccess,
    }

    return {
      checkers: checkers as CheckerType[],
      pre_transformers: pre_transformers as TransformerType[],
      post_transformers: post_transformers as TransformerType[],
      transform_after: after_transformer(ctx),
      hooks,
    }
  }

  get app(): Express {
    return this.adapterHost.httpAdapter.getInstance()
  }
}

function applyCheckers(checkers: CheckerType[], data: any) {
  for (const checker of checkers) {
    checker(data)
  }
}

function applyTransformers(post_transformers: TransformerType[], result: any) {
  for (const transformer of post_transformers) {
    result = transformer(result)
  }
  return result
}

export interface CRUDProvider<T> {
  create(data: AddReq<T>): Promise<any>
  read(query: PageQuery<T>): Promise<PageRes<T>>
  update(data: EditReq<T>): Promise<any>
  delete(data: DelReq<T>): Promise<any>
}

export class RouterBuilder {
  router: Router = express.Router()
  pre_middlewares: express.RequestHandler[] = []
  post_middlewares: express.RequestHandler[] = []

  constructor() {}
  setRoute(
    method: 'get' | 'post' | 'put' | 'delete' | 'patch',
    path: string,
    handler: express.RequestHandler
  ) {
    this.router[method](path, ...this.pre_middlewares, handler)
    return this
  }

  addPreMiddlewares(...middleware: any[]) {
    this.pre_middlewares.push(...middleware)
    return this
  }

  addPostMiddlewares(...middleware: any[]) {
    this.post_middlewares.push(...middleware)
    return this
  }

  build() {
    return this.router
  }
}

export async function perform_task(
  req: express.Request,
  task: (data: any) => Promise<any>,
  res: express.Response
) {
  const body = req.body
  try {
    const result = await task(body)
    res.status(200).json(result)
  } catch (e) {
    res
      .status(500)
      .json({
        message: e.message,
      })
      .end()
  }
}
