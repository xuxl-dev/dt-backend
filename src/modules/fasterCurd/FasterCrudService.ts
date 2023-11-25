import { Injectable } from '@nestjs/common'
import { HttpAdapterHost } from '@nestjs/core'
import { Express } from 'express'
import express = require('express')
import { ClassType, ConfigCtx, PartialBeforeActionOptions } from './decorators'
import {
  BeforeActionTokenType,
  CRUDMethods,
  FCRUD_GEN_CFG_TOKEN,
  FIELDS_TOKEN,
  HttpMethods,
} from './fcrud-tokens'
import { ENTITY_NAME_TOKEN, GEN_CRUD_METHOD_TOKEN } from './fcrud-tokens'
import { getProtoMeta } from './reflect.utils'
import { defaultCrudMethod } from './fcrud-tokens'
import {
  CheckerType,
  IGNORE_ME,
  TransformerType,
  post_transformer_factories,
} from './fragments'
import { FCrudJwtMiddleware } from './middleware/jwt.middleware'
import {
  logger,
  CRUDProvider,
  FasterCrudRouterBuilder,
  fixRoute,
  perform_task,
  isArrayOfFunctions,
} from './fasterCRUD'
import {
  checker_factories,
  deny_checker,
  exactly_checker,
  except_checker,
  pagination_checker,
  requrie_checker,
  shape_checker,
  pre_transformer_factories,
  type_checker,
} from './fragments'
import { exceptionMiddleware } from './middleware/exception.middleware'

export type QueryData = {
  data: any
  pagination?: {
    currentPage: number
    pageSize: number
  }
  sort?: {
    prop: string
    order: string
  }
}

@Injectable()
export class FasterCrudService {
  prefix = `dt-api/`
  default_method: HttpMethods = 'post'

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

  generateCRUD<T extends ClassType<T>>(entity: T, provider: CRUDProvider<T>) {
    const { docs, fcrudName, fields } = this.getMeta<T>(entity)
    const router = new FasterCrudRouterBuilder()
      .addPreMiddlewares(this.fCrudJwtMiddleware.FcrudJwtMiddleware)
      .addPostMiddlewares(exceptionMiddleware)

    router.setRoute('get', `/dict`, async function (req, res) {
      res.status(200).json(docs)
    })

    // create all CRUD routes
    const actions: CRUDMethods[] =
      getProtoMeta(entity, GEN_CRUD_METHOD_TOKEN) ?? defaultCrudMethod

    for (const action of actions) {
      const method = provider[action].bind(provider) // have to bind to provider, otherwise this will be undefined
      const action_token: BeforeActionTokenType = `before-action-${action}`
      const decoration_config = getProtoMeta(
        entity,
        action_token
      ) as PartialBeforeActionOptions<T>
      const decoratedMethod = this.configureMethod(
        {
          options: decoration_config,
          target: entity,
          fields,
        },
        method
      )

      const route = fixRoute(decoration_config?.route ?? `/${action}`)
      router.setRoute(this.default_method, route, async function (req, res) {
        await perform_task(req, decoratedMethod, res)
      })
    }

    this.addRouter(`/${this.prefix}${fcrudName.toLowerCase()}`, router.build())
  }

  private getMeta<T extends ClassType<T>>(entity: T) {
    const fcrudName = getProtoMeta(entity, ENTITY_NAME_TOKEN) ?? entity.name
    const fields = getProtoMeta(entity, FIELDS_TOKEN) ?? {}
    const docs = getProtoMeta(entity, FCRUD_GEN_CFG_TOKEN) ?? {}
    return { docs, fcrudName, fields }
  }

  configureMethod<T extends ClassType<T>>(
    cfg: ConfigCtx<T>,
    method: (data: any) => Promise<any>
  ) {
    if (!cfg || !cfg.options) {
      return method
    }

    const { checkers, pre_transformers, post_transformers, hooks } =
      this.parseOptions(cfg)
    return async (data: any) => {
      try {
        applyCheckers(checkers, data)

        data = applyTransformers(pre_transformers, data)

        console.log(`exec with data:`, data)

        let result = await method(data)

        result = applyTransformers(post_transformers, result)

        logger.debug(`exec result:`, result)

        return result
      } catch (e) {
        logger.error(`error when executing method ${method.name}:`, e)
        throw new Error(e.message)
      }
    }
  }

  private parseOptions(ctx: ConfigCtx) {
    let [checkers, pre_transformers, post_transformers] = [
      checker_factories,
      pre_transformer_factories,
      post_transformer_factories,
    ].map((f) => {
      // get all products, and filter out empty ones
      return f.map((f) => f(ctx)).filter((item) => item !== IGNORE_ME)
    })

    const hooks = [] //TODO: hooks are not implemented yet

    return {
      checkers: checkers as CheckerType[],
      pre_transformers: pre_transformers as TransformerType[],
      post_transformers: post_transformers as TransformerType[],
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
