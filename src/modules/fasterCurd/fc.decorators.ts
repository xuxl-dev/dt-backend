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
import { CRUDMethod } from './backend/fc.tokens'
import { FC } from './crud-gen/fast-crud.decorator'
import { FastCrudFieldOptions } from './crud-gen/fast-crud.decl'
import { applyDecorators } from '@nestjs/common'
import { ObjectLiteral } from './crud-gen/fast-crud.decl'
import { ClassType } from 'src/utils/utils'

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
  }
}

type FieldSelector<T> = (keyof T)[] | RegExp

export type Only<T, K extends keyof T> = {
  [P in keyof T]: P extends K ? T[P] : never
}

type FullShapeOptions<T> = {
  requires: FieldSelector<T>
  denies: FieldSelector<T>
  exactly: (keyof T)[]
}

type ShapeOptions<T> = Partial<
  | Only<FullShapeOptions<T>, 'requires' | 'denies'>
  | Only<FullShapeOptions<T>, 'exactly'>
>

type FullTransformQurryRetOptions = {
  transformQueryRet?: (result: any) => any
  TransformQueryRetInplace?: (result: any) => any
}

type TransformQurryRetOptions = Partial<
  | Only<FullTransformQurryRetOptions, 'transformQueryRet'>
  | Only<FullTransformQurryRetOptions, 'TransformQueryRetInplace'>
>

type FullTransformRecordsOptions = {
  TransformRecords?: (record: any) => any
  TransformRecordsInplace?: (record: any) => any
}

type TransformRecordsOptions = Partial<
  | Only<FullTransformRecordsOptions, 'TransformRecordsInplace'>
  | Only<FullTransformRecordsOptions, 'TransformRecords'>
>



export type ActionOptions<T> = {
  action: string
  method: CRUDMethod
  /**
   * if enabled, the input data will not be transformed
   * that means, pagination, sort, etc. will not be parsed
   */
  rawInput?: boolean
  pagination?: {
    min?: number
    max: number
  }
  sort?: {
    [prop in keyof T]?: 'ASC' | 'DESC'
  }
  allow_sort?: FieldSelector<T>
  checkType?: boolean
  /**
   * @deprecated
   */
  route_override?: string
  expect?: ((data: T) => boolean) | ((data: T) => boolean)[]
  transform?: (data: T) => T
  transformQueryRet?: (result: any) => any
  TransformQueryRetInplace?: (result: any) => any
  TransformRecords?: (record: any) => any
  TransformRecordsInplace?: (record: T) => any
  transformAfter?: (data: { form: T }, queryRet: any) => any 
  //TODO make transformQueryRet TransformQueryRetInplace TransformRecords TransformRecordsInplace mutually exclusive
  // Or find a proper order to execute them
  onSuccess?: (data: T) => any
  onCheckFailure?: (data: T) => any
  onTransformFailure?: (data: T) => any
  onExecFailure?: (data: T) => any
  ctx?: object | null
} & ShapeOptions<T>

export type ConfigCtx<T extends ObjectLiteral = any> = {
  option: ActionOptions<T>
  target: T
  fields: FieldOptionsObject
  action: string
}

type PartialActionOptions<T> = Partial<ActionOptions<T>>

export function Action<T extends abstract new (...args: any) => InstanceType<T>>(
  options: ActionOptions<InstanceType<T>>
) {
  return function classDecorator(target: T) {
    // const token: BeforeActionTokenType = `${fcrud_prefix}before-action-${method}`
    // setProtoMeta(target, token, options)

    mergeProtoMeta(target, BEFORE_ACTION_SUM_TOKEN, {
      [options.action ?? options.method]: options,
    })
  }
}

export function Create<T extends ClassType<T>>(
  options: PartialActionOptions<InstanceType<T>>
) {
  return Action<T>({ ...options, method: 'create', action: 'create' })
}

export function Read<T extends abstract new (...args: any) => InstanceType<T>>(
  options: PartialActionOptions<InstanceType<T>>
) {
  return Action<T>({ ...options, method: 'read', action: 'read' })
}

export function Update<T extends ClassType<T>>(
  options: PartialActionOptions<InstanceType<T>>
) {
  return Action<T>({ ...options, method: 'update', action: 'update' })
}

export function Delete<T extends ClassType<T>>(
  options: PartialActionOptions<InstanceType<T>>
) {
  return Action<T>({ ...options, method: 'delete', action: 'delete' })
}

export function IgnoreField<
  T extends { new (...args: any[]): InstanceType<T> }
>(li: (keyof InstanceType<T>)[]) {
  return (target: T) => {
    setProtoMeta(target, IGNORE_FIEIDS_TOKEN, li)
  }
}
