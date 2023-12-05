import {
  ExtendsOnly,
  Intersection,
  Prettify,
  Prettify2,
} from 'src/utils/type.utils'
import { ClassType } from 'src/utils/utils'

type ActionName = string

export type LabeledActionOptions<T> =
  | CreateActionOption<T>
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
type CreateTransformOption<T> = {
  transform?: (form: T) => T
  TransformQueryRetInplace?: (result: CreateResult) => void
  transformQueryRet?: (result: CreateResult) => any
  transformAfter?: (form: T, queryRet: any) => any
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

export type CreateActionOption<T> = ActionBaseOption<T> & {
  method: 'create'
} & Partial<CreateTransformOption<T>> &
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

type TupleToNamedObject<T extends any[]> = {
  [K in T[number]as `#${K}`]: K
}

type TupleToStorage<T> = {
  [K in keyof T as `_${Exclude<K, keyof Array<any>> & string}`]: T[K]
}

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


type CreateTransformOption2<T, K> = {
  transformQueryRet?: (result: CreateResult) => K
  transformAfter?: (form: T, queryRet: K) => any
}

type CreateTransformOption3<T, K> = {
  transformUpdateQueryRet?: (result: CreateResult) => K
  transformUpdateAfter?: (form: T, queryRet: K) => any
}

type SubObject<T, K extends keyof T> = {
  [P in K]: T[P]
}

type FieldName<T, K extends keyof T> = K extends keyof T ? K : never

type IsFunction<T> = T extends (...args: any) => any ? T : never

type TransformCreateOpt<T extends SubObject<T, 'a' | 'b'>> = {
  [K in keyof T]: K extends FieldName<T, 'b'>
  ? (
    arg: ReturnType<IsFunction<T[FieldName<T, 'a'>]>>
  ) => ReturnType<IsFunction<T[FieldName<T, 'b'>]>> // If the key is 'a', set the output type of 'b' to the output type of 'a'
  : T[K]
}

type HasAll<T, K extends string[]> = T extends { [P in K[number]]: any } ? T : never

type TransformCreateOpt3<T> = TransformCreateOpt2<HasAll<T, ['a', 'b']>>

type TransformCreateOpt2<T extends SubObject<T, 'a' | 'b'>> = {
  [K in keyof T]: K extends FieldName<T, 'b'>
  ? (
    arg: ReturnType<IsFunction<T[FieldName<T, 'a'>]>>
  ) => ReturnType<IsFunction<T[FieldName<T, 'b'>]>> // If the key is 'a', set the output type of 'b' to the output type of 'a'
  : T[K]
}


type CreateOption<T> = {
  method: 'create'
  a?: (a: T) => any
  b?: (arg) => any
}

export function Create<T, K>(
  // options: ExtendsOnly<CreateOption<T>, TransformCreateOpt3<K>> & K
  options: Intersection<CreateOption<T>, K> & Prettify<Intersection<TransformCreateOpt3<K>, K>>
) {
  return function classDecorator(target: T) { }
}
type hasall = HasAll<{
  method: 'create',
  a: (a: number) => number
  b: (arg) => any
}, ['a', 'b']>

type ths = TransformCreateOpt3<{
  method: 'create',
  a: (a: number) => "asd"
  b: (arg) => any
}>

type inter = Intersection<ths, {
  method: 'create',
  a: (a) => 123,
  b: (arg) => 666,
}>

@Create({
  method: 'create',
  a: (a) => ({ s: 666 }),
  // b: (arg) => 666,
  b: (arg) => { },
})
class Demo {
  id: number
  name: string
}

// type CreateTransformOption3<T> = <K>() => {
//   transformUpdateQueryRet?: (result: CreateResult) => K
//   transformUpdateAfter?: (form: T, queryRet: K) => any
// }

// type CreateTransformOption3<T, K> = {
//   transformUpdateQueryRet?: (result: CreateResult) => K
//   transformUpdateAfter?: (form: T, queryRet: K) => any
// }

// const myFn = <T>(arg: {
//   a: (a_arg: number) => T
//   b: <U extends T>(b_arg: U) => void
// }) => { }

// myFn({
//   a: (a) => ({ num: 0 }),
//   b: (b_arg) => {
//     b_arg.num
//   }, // Works!
// })

// type DemoDecoratorOptions<V extends DemoDecoratorOptions<V>> = {
//   a: () => ReturnType<V['a']>
//   b: (aResult: ReturnType<V['a']>) => number
// }

// export function Deco<
//   T extends abstract new (...args: any) => InstanceType<T>,
//   V extends DemoDecoratorOptions<V>
// >(options: V) {
//   return function classDecorator(target: T) { }
// }

// @Deco({
//   a: () => ({ c: 1 }),
//   b: (a) => 666,
// })
// class Demo {
//   a: () => ({ foo: 'bar' })
//   b: () => 123
// }

// type SubObject<T, K extends keyof T> = {
//   [P in K]: T[P];
// };

// type FieldName<T, K extends keyof T> = K extends keyof T ? K : never

// type DemoTransformKeys<T extends SubObject<Demo, 'a' | 'b'>> = {
//   [K in keyof T]: K extends FieldName<Demo, 'b'>
//   ? (arg: ReturnType<T[FieldName<Demo, 'a'>]>) => ReturnType<T[FieldName<Demo, 'b'>]>  // If the key is 'a', set the output type of 'b' to the output type of 'a'
//   : T[K];
// }

// type pdt = Prettify<DemoTransformKeys<Demo>>

// type TransformKeys<T extends { a?, b?}> = {
//   [K in keyof T]: K extends 'b'
//   ? (arg: ReturnType<T['a']>) => ReturnType<T['b']>  // If the key is 'a', set the output type of 'b' to the output type of 'a'
//   : T[K];
// };

// // Example usage
// type MyType = {
//   a: () => { result: number };
//   b: () => string;
//   c: boolean;
// };

// type TransformedType = TransformKeys<MyType>;

// TransformedType will be:
// {
//   a: () => { result: number };
//   b: () => string;  // 'b' input type is changed to 'a' output type
//   c: boolean;
// }
