import 'reflect-metadata'
import {
  BEFORE_ACTION_SUM_TOKEN,
  BeforeActionTokenType,
  ENTITY_NAME_TOKEN,
  FIELDS_TOKEN,
  GEN_CRUD_METHOD_TOKEN,
  IGNORE_FIEIDS_TOKEN,
  fcrud_prefix,
} from './backend/fc.tokens'
import {
  getProtoMeta,
  mergeProtoMeta,
  setProtoMeta,
} from '../../utils/reflect.utils'
import { CRUDMethod } from './backend/decl/base.decl'
import { FC } from './crud-gen/fast-crud.decorator'
import { FastCrudFieldOptions } from './crud-gen/fast-crud.decl'
import { applyDecorators } from '@nestjs/common'
import { ObjectLiteral } from './crud-gen/fast-crud.decl'
import { ClassType } from 'src/utils/utils'
import { ExcludeNever, Only } from 'src/utils/type.utils'
import {
  CreateActionOption,
  CreateOption,
  DeleteActionOption,
  DeleteOption,
  LabeledActionOptions,
  ReadActionOption,
  ReadOption,
  UpdateActionOption,
  UpdateOption,
} from './backend/decl/action.decl'

export type FieldOptions = Partial<{
  name: string
  type: string
  validator?: (x: any) => boolean
  noCheck?: boolean
  requires_override?: boolean
}>

export type FieldOptionsObject = {
  [key: string]: FieldOptions
}

export function Field(opt: FieldOptions = {}): PropertyDecorator {
  return function (target: any, key: string) {
    let { name, type } = opt
    const _type_constructor = Reflect.getMetadata('design:type', target, key)
    const _name = key
    // const _key = Symbol(key);

    name = name || _name
    type = type || _type_constructor.name
    const newOption = Object.assign(opt, {
      name,
      type,
    })
    const existingMetadata = Reflect.getMetadata(FIELDS_TOKEN, target) || {}
    Reflect.defineMetadata(
      FIELDS_TOKEN,
      Object.assign(existingMetadata, { [name]: newOption }),
      target
    )
  }
}

export function FieldFC(
  opt: Partial<FieldOptions & { fc: FastCrudFieldOptions }> = {}
) {
  return applyDecorators(Field(opt), FC(opt.fc))
}

type CURDOptions = {
  name: string
  methods: CRUDMethod[]
  exposeDict: boolean
}

export function CRUD<T extends { new (...args: any[]): InstanceType<T> }>(
  options: Partial<CURDOptions> = {}
) {
  return function classDecorator(target: T) {
    const li = getProtoMeta(target, IGNORE_FIEIDS_TOKEN)
    const fields = getProtoMeta(target, FIELDS_TOKEN)
    // console.log(li)
    // console.log(fields)
    setProtoMeta(target, ENTITY_NAME_TOKEN, options.name)
    setProtoMeta(target, GEN_CRUD_METHOD_TOKEN, options.methods)
    // remove ignored fields
    if (li && Array.isArray(li) && fields) {
      for (const field of li) {
        delete fields[field]
      }
    }
    setProtoMeta(target, FIELDS_TOKEN, fields)
    const methodConfigs = getProtoMeta(target, BEFORE_ACTION_SUM_TOKEN)
    // console.log('CRUD', target.name, options, fields, methodConfigs)
  }
}

export type ConfigCtx<T extends ObjectLiteral = any> = {
  // option: ActionOptions<T>
  option: LabeledActionOptions<T, any>
  target: T
  fields: FieldOptionsObject
  action: string
}

export function Action<T extends ClassType<T>, K>(
  options: LabeledActionOptions<InstanceType<T>, K>
) {
  return function classDecorator(target: T) {
    mergeProtoMeta(target, BEFORE_ACTION_SUM_TOKEN, {
      [options.action ?? options.method]: options,
    })
  }
}

export function Create<T extends ClassType<T>, K1>(
  options: CreateActionOption<InstanceType<T>, K1>
) {
  return Action<T, K1>({
    action: 'create', // this can be overrided by options.action
    ...options,
    method: 'create',
  } as CreateOption<InstanceType<T>, K1>)
}

export function Read<T extends ClassType<T>, K1>(
  options: ReadActionOption<InstanceType<T>, K1>
) {
  return Action<T, K1>({
    action: 'read', // this can be overrided by options.action
    ...options,
    method: 'read',
  } as ReadOption<InstanceType<T>, K1>)
}

export function Update<T extends ClassType<T>, K1>(
  options: UpdateActionOption<InstanceType<T>, K1>
) {
  return Action<T, K1>({
    action: 'update', // this can be overrided by options.action
    ...options,
    method: 'update',
  } as UpdateOption<InstanceType<T>, K1>)
}

export function Delete<T extends ClassType<T>, K1>(
  options: DeleteActionOption<InstanceType<T>, K1>
) {
  return Action<T, K1>({
    action: 'delete', // this can be overrided by options.action
    ...options,
    method: 'delete',
  } as DeleteOption<InstanceType<T>, K1>)
}

export function IgnoreField<
  T extends { new (...args: any[]): InstanceType<T> }
>(li: (keyof InstanceType<T>)[]) {
  return (target: T) => {
    setProtoMeta(target, IGNORE_FIEIDS_TOKEN, li)
  }
}
