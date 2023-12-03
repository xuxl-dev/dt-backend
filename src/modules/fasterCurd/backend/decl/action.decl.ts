import {
  ExtendsOnly,
  Intersection,
  Prettify,
  Prettify2,
} from 'src/utils/type.utils'
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

type TupleToStorage<T> = {
  [K in keyof T as `_${Exclude<K, keyof Array<any>> & string}`]: T[K]
}
type test = ObjValueTuple<{ a: 1; b: 22; c: 3 }>

type StorageOfObj<T> = TupleToStorage<ObjValueTuple<T>>
// type StorageOfN<T extends number> = TupleToStorage<ObjValueTuple<T>>
type Grow<T, A extends Array<T>> = ((x: T, ...xs: A) => void) extends (
  ...a: infer X
) => void
  ? X
  : never
type GrowToSize<T, A extends Array<T>, N extends number> = {
  0: A
  1: GrowToSize<T, Grow<T, A>, N>
}[A['length'] extends N ? 0 : 1]

export type FixedArray<T, N extends number> = GrowToSize<T, [], N>

type arr<T extends number> = FixedArray<any, T>
type StorageOf<T extends number> = TupleToStorage<arr<T>>

type testType<U, V> = U extends V ? true : false

export type LabeledActionOptions2<T, K> = CreateActionOption2<T, K>

export function Action3<
  T extends abstract new (...args: any) => InstanceType<T>,
  K
>(options: LabeledActionOptions2<InstanceType<T>, K>) {
  return function classDecorator(target: T) {}
}

type CreateTransformOption2<T, K> = {
  transformQueryRet?: (result: CreateResult) => K
  transformAfter?: (form: T, queryRet: K) => any
}

type CreateTransformOption3<T, K> = {
  transformUpdateQueryRet?: (result: CreateResult) => K
  transformUpdateAfter?: (form: T, queryRet: K) => any
}

export type CreateActionOption2<T, K> = {
  method: 'create'
} & Partial<CreateTransformOption2<T, K>> &
  Partial<CreateTransformOption3<T, K>>

type OptionType<T extends ClassType<T>, K> = Prettify<
  Partial<ExtendsOnly<K, OmitMethod<CreateActionOption2<InstanceType<T>, K>>>>
> &
  Prettify<OmitMethod<CreateActionOption2<InstanceType<T>, K>>>

type OmitMethod<T> = Omit<T, 'method'>
export function Create3<T extends ClassType<T>, K>(
  options: OptionType<T, K>
  // options: K
  // options: OmitMethod<CreateActionOption2<InstanceType<T>, K>>
) {
  return Action3<T, K>({
    ...options,
    method: 'create',
    action: 'create',
  })
}

// type CreateTransformOption3<T> = <K>() => {
//   transformUpdateQueryRet?: (result: CreateResult) => K
//   transformUpdateAfter?: (form: T, queryRet: K) => any
// }

type AB<T> = {
  a: () => T
  b: (a:T) => any
}

export function Extract2<
  T extends abstract new (...args: any) => InstanceType<T>,
  K extends tmp
>(options: Transform<K>) {
  return function classDecorator(target: T) {}
}

type tmp = {
  a: () => 666;
  b: (b: any) => 2;
}
type Transform<T extends tmp> = {
  a: () => 666;
  b: (b: ReturnType<T['a']>) => 2;
}
type Transformed = Transform<tmp>

@Create3({
  transformQueryRet: (result) => '123',
  transformAfter: (form, queryRet) => 213,
  // transformUpdateQueryRet: (result) => 321,
})
@Extract2({
  a: () => 666,
  b: (b) => 2,
})
class TU {
  ids: number
  id: number
  name: string
}
