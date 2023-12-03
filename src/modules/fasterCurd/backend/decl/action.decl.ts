import { ClassType } from 'src/utils/utils'

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

/**
 * T: the entity type
 * K: the user input type (config)
 */
type CreateTransformOption<T, K1> = {
  transform?: (form: T) => T
  TransformQueryRetInplace?: (result: CreateResult) => void
  transformQueryRet?: (result: CreateResult) => K1
  transformAfter?: (form: T, queryRet: K1) => any
}

type ElementOf<T> = T extends Array<infer E> ? E : never

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
} & Partial<CreateTransformOption<T, K>> &
  Partial<CreateHookOption<T>>

type ReadActionOption<T> = ActionBaseOption<T> & {
  method: 'read'
} & Partial<SortOption<T>>

type UpdateActionOption<T> = ActionBaseOption<T> & {
  method: 'update'
}

type DeleteActionOption<T> = ActionBaseOption<T> & {
  method: 'delete'
}
type TupleToObject<T extends readonly any[]> = {
  [K in T[number]]: T[number]
}

type UnionToIntersection<U> = (U extends any ? (k: U) => void : never) extends (
  k: infer I
) => void
  ? I
  : never
type LastOf<T> = UnionToIntersection<
  T extends any ? () => T : never
> extends () => infer R
  ? R
  : never

type Push<T extends any[], V> = [...T, V]

type TuplifyUnion<
  T,
  L = LastOf<T>,
  N = [T] extends [never] ? true : false
> = true extends N ? [] : Push<TuplifyUnion<Exclude<T, L>>, L>

type ObjValueTuple<
  T,
  KS extends any[] = TuplifyUnion<keyof T>,
  R extends any[] = []
> = KS extends [infer K, ...infer KT]
  ? ObjValueTuple<T, KT, [...R, T[K & keyof T]]>
  : R

//
type testStorage2 = TupleToStorage<[1, 2, {}]>
type TupleToNamedObject<T extends any[]> = {
  [K in T[number] as `#${K}`]: K
}

type TupleToStorage<T extends any[]> = {
  [K in keyof T as `_${Exclude<K, keyof Array<any>> & string}`]: T[K]
}
type test = ObjValueTuple<{ a: 1; b: 22; c: 3 }>

function enumeratedObject<T>(object: T): TupleToStorage<ObjValueTuple<T>> {
  return Object.keys(object).reduce((acc, key) => {
    acc[`#${key}`] = key
    return acc
  }, {}) as any
}

type StorageOf<T> = TupleToStorage<ObjValueTuple<T>>
type testStore = StorageOf<{ a: 1; b: 22; c: 3 }>
const ret = enumeratedObject({
  a: {
    myKey: { aaa: 6 },
  },
  b: 2,
  c: 3,
})

type CreateTransformOption3<T, K extends StorageOf<{ a }>> = {
  transformQueryRet?: (
    result: CreateResult
  ) => K extends StorageOf<{ a: infer A }> ? A : never
  transformAfter?: (
    form: T,
    queryRet: K extends StorageOf<{ a: infer A }> ? A : never
  ) => any
}
type testType<U, V> = U extends V ? true : false

export function Action3<
  T extends abstract new (...args: any) => InstanceType<T>,
  K
>(options: LabeledActionOptions<InstanceType<T>, K>) {
  return function classDecorator(target: T) {}
}

type CreateTransformOption2<T, K1 extends StorageOf<{ a }>> = {
  transform?: (form: T) => T
  TransformQueryRetInplace?: (result: CreateResult) => void
  transformQueryRet?: (result: CreateResult) => K1['_0']
  transformAfter?: (form: T, queryRet: K1['_0']) => any
}

export type CreateActionOption2<T, K extends StorageOf<{ a }>> = {
  method: 'create'
} & Partial<CreateTransformOption2<T, K>>

type OmitActionType<T> = Omit<T, 'action' | 'method'>
export function Create3<T extends ClassType<T>, K>(
  options: OmitActionType<CreateActionOption<InstanceType<T>, K>>
) {
  return Action3<T, K>({ ...options, method: 'create', action: 'create' })
}

@Create3({
  transformQueryRet: (result) => {
    return {
      name: 'hello',
      id: 114514,
      6: 666,
    }
  },
  transformAfter: (form, queryRet) => {},
})
class TU {
  id: number
  name: string
}
