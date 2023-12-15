import {
  SubObject,
  FieldName,
  IsFunction,
  Only,
} from 'src/utils/type.utils'
import { FieldsOrReg, Fields } from 'src/utils/type.utils'
import { TransformOf } from '../transform/builder'

type ActionName = string

export type LabeledActionOptions<
  T,
  K1 = any,
  K2 = any,
  K3 = any,
  K4 = any,
  K5 = any
> =
  | CreateOption<T, K1>
  | ReadOption<T, K1>
  | UpdateOption<T, K1>
  | DeleteOption<T, K1>


type OptionalBaseOption<T> = Partial<{
  rawInput: boolean
  checkType: boolean
  route_override: string
  expect: ((data: T) => boolean) | ((data: T) => boolean)[]
  ctx: object
}>

//TODO implement this
type TODO = any
type CreateResult = TODO
type ReadResult = TODO
type UpdateResult = TODO
type DeleteResult = TODO

type CreateTransformOption<T, K1> = {
  transform?: (form: T) => T
  TransformQueryRetInplace?: (result: CreateResult) => void
  transformQueryRet?: (result: CreateResult) => K1
  transformAfter?: (form: T, queryRet: K1) => any
}
type FieldSelector<T> = (keyof T)[] | RegExp
type FullShapeOptions<T> = {
  require: FieldSelector<T>
  deny: FieldSelector<T>
  exactly: (keyof T)[]
}

type ShapeOptions<T> =
  | Only<FullShapeOptions<T>, 'require' | 'deny'>
  | Only<FullShapeOptions<T>, 'exactly'>

type ReadTransformOption<T> = {
  transform?: (form: any) => any
  // transformQueryRet?: (result: T[]) => any
  transformQueryRet?: ReturnType<TransformOf<T[]>>
  TransformQueryRetInplace?: (result: T[]) => any
  TransformRecords?: (records: T[]) => T[]
  /**
   * This may affect delete (by changing the records to be deleted)
   * @param record
   * @returns
   */
  TransformRecordInplace?: (record: T) => void
  transformAfter?: (data: { form: any }, queryRet: T[]) => any
}
type UpdateTransformOption<T> = {
  transform?: (data: T) => T
  transformQueryRet?: (result: UpdateResult) => any
  TransformQueryRetInplace?: (result: UpdateResult) => any
  TransformRecords?: (record: any) => any
  TransformRecordsInplace?: (record: T) => any
  transformAfter?: (data: { form: T }, queryRet: any) => any
}
type DeleteTransformOption<T> = {
  transform?: (data: { row: T }) => Partial<T> | any
  transformQueryRet?: (result: DeleteResult) => any
  TransformQueryRetInplace?: (result: DeleteResult) => any
  TransformRecords?: (record: any) => any
  TransformRecordsInplace?: (record: T) => any
  transformAfter?: (data: { form: T }, queryRet: any) => any
}
//TODO implement this
type BaseHookOption<T> = {
  onCheckFailure?: (data: T) => any
  onPreTransformFailure?: (data: T) => any
  onExecFailure?: (data: T) => any
  onPostTransformFailure?: (data: T) => any
  onSuccess?: (data: T) => any
}

type CreateHookOption<T> = {} & BaseHookOption<T>
type ReadHookOption<T> = {} & BaseHookOption<T>
type UpdateHookOption<T> = {} & BaseHookOption<T>
type DeleteHookOption<T> = {} & BaseHookOption<T>

export type CreateActionOption<T, K1> = OptionalBaseOption<T> &
  Partial<CreateTransformOption<T, K1>> &
  Partial<CreateHookOption<T>> &
  Partial<ShapeOptions<T>>

export type CreateOption<T, K1> = CreateActionOption<T, K1> & {
  action: ActionName
  method: 'create'
}

export type PaginationOption = {
  pagination?: {
    min?: number
    max: number
  }
}

export type SortOption<T> = {
  sort?: {
    [prop in keyof T]?: 'ASC' | 'DESC'
  }
  allow_sort?: FieldsOrReg<T>
}

export type ReadActionOption<T, K1> = OptionalBaseOption<T> &
  Partial<ReadHookOption<T>> &
  Partial<ReadTransformOption<T>> &
  Partial<ShapeOptions<T>> &
  Partial<PaginationOption> &
  Partial<SortOption<T>>

export type ReadOption<T, K1> = ReadActionOption<T, K1> & {
  action: ActionName
  method: 'read'
}

export type UpdateActionOption<T, K1> = OptionalBaseOption<T> &
  Partial<UpdateTransformOption<T>> &
  Partial<UpdateHookOption<T>> &
  Partial<ShapeOptions<T>>

export type UpdateOption<T, K1> = UpdateActionOption<T, K1> & {
  action: ActionName
  method: 'update'
}

export type DeleteActionOption<T, K1> = OptionalBaseOption<T> &
  Partial<DeleteTransformOption<T>> &
  Partial<DeleteHookOption<T>> &
  Partial<ShapeOptions<T>>

export type DeleteOption<T, K1> = DeleteActionOption<T, K1> & {
  action: ActionName
  method: 'delete'
}
