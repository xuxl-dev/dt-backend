
type ActionName = string

export type LabeledActionOptions<T, K> =
  | CreateActionOption<T, K>
  | ReadActionOption<T>
  | UpdateActionOption<T>
  | DeleteActionOption<T>

type ActionBaseOption<T> = {
  action: ActionName
} & OptionalBaseOption<T>

type OptionalBaseOption<T> = Partial<{
  rawInput: boolean
  checkType: boolean
  route_override: string
  expect: ((data: T) => boolean) | ((data: T) => boolean)[]
}>

type FieldsOrReg<T> = (keyof T)[] | RegExp
type Fields<T> = (keyof T)[]
type Field<T> = keyof T

type SortOption<T> = {
  sort: {
    [prop in keyof T]?: 'ASC' | 'DESC'
  }
  allow_sort: FieldsOrReg<T>
}

type FieldOption<T> = {
  requires: FieldsOrReg<T>
  denies: FieldsOrReg<T>
  exactly: Fields<T>
}

type FormOption<T> = {
  form: Partial<T>
}
type RowOption<T> = {
  row: Partial<T>
}
type TODO = any
type CreateResult = TODO
type ReadResult = TODO
type UpdateResult = TODO
type DeleteResult = TODO

type CreateTransformOption<T, K> = {
  transform?: (form: T) => T
  TransformQueryRetInplace?: (result: CreateResult) => void
  transformQueryRet?: (result: CreateResult) => K
  transformAfter?: (form: T, queryRet: K) => any
}


type ElementOf<T> = T extends Array<infer E> ? E : never;

type ReadTransformOption<T> = {
  transform?: (form: any) => any
  transformQueryRet?: (result: any) => any
  TransformQueryRetInplace?: (result: any) => any
  TransformRecords?: (records: T[]) => T[]
  TransformRecordInplace?: (record: T) => void
  transformAfter?: (data: { form: any }, queryRet: any) => any
}
type UpdateTransformOption<T> = {
  transform?: (data: T) => T
  transformQueryRet?: (result: any) => any
  TransformQueryRetInplace?: (result: any) => any
  TransformRecords?: (record: any) => any
  TransformRecordsInplace?: (record: T) => any
  transformAfter?: (data: { form: T }, queryRet: any) => any
}
type DeleteTransformOption<T> = {
  transform?: (data: T) => T
  transformQueryRet?: (result: any) => any
  TransformQueryRetInplace?: (result: any) => any
  TransformRecords?: (record: any) => any
  TransformRecordsInplace?: (record: T) => any
  transformAfter?: (data: { form: T }, queryRet: any) => any
}

type CreateHookOption<T> = {}
type ReadHookOption<T> = {}
type UpdateHookOption<T> = {}
type DeleteHookOption<T> = {}

export type CreateActionOption<T, K> = ActionBaseOption<T> & {
  method: 'create'
} & Partial<CreateTransformOption<T, K>> & Partial<CreateHookOption<T>>

type ReadActionOption<T> = ActionBaseOption<T> & {
  method: 'read'
} & Partial<SortOption<T>>

type UpdateActionOption<T> = ActionBaseOption<T> & {
  method: 'update'
}

type DeleteActionOption<T> = ActionBaseOption<T> & {
  method: 'delete'
}

