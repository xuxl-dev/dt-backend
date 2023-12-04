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
type TestTransform<T extends CreateTransformOption3<T, K>, K> = {
  transformUpdateQueryRet?: (result: CreateResult) => K
  transformUpdateAfter?: (
    form: T,
    queryRet: ReturnType<T['transformUpdateQueryRet']>
  ) => any
}

export type CreateActionOption2<T, K> = {
  method: 'create'
} & Partial<TestTransform<CreateTransformOption3<T, K>, K>> // & Partial<CreateTransformOption2<T, K>>

type OptionType<T extends ClassType<T>, K> = Prettify<
  Partial<ExtendsOnly<K, OmitMethod<CreateActionOption2<InstanceType<T>, K>>>>
> &
  Prettify<OmitMethod<CreateActionOption2<InstanceType<T>, K>>>

type FilterFunction<T, U> = T extends (...args: infer Args) => infer Return
  ? U extends (...args: any[]) => any
    ? (...args: Args) => Return
    : never
  : never

type SubObject<T, K extends keyof T> = {
  [P in K]: T[P]
}

type FieldName<T, K extends keyof T> = K extends keyof T ? K : never

// type DemoTransformKeys<T extends SubObject<T, 'transformUpdateAfter' | 'transformUpdateQueryRet'>> = {
//   [K in keyof T]: K extends FieldName<T, 'transformUpdateQueryRet'>
//     ? FilterFunction<T[K], (...args: any[]) => any>
//     : T[K];
// };

type DemoTransformKeys<
  T extends SubObject<T, 'transformUpdateAfter' | 'transformUpdateQueryRet'>
> = {
  [K in keyof T]: K extends FieldName<T, 'transformUpdateQueryRet'>
    ? (
        arg: ReturnType<
          T[FieldName<T, 'transformUpdateAfter'>] & ((...args: any[]) => any)
        >
      ) => ReturnType<
        T[FieldName<T, 'transformUpdateQueryRet'>] & ((...args: any[]) => any)
      > // If the key is 'a', set the output type of 'b' to the output type of 'a'
    : T[K]
}

type opt = Prettify<
  OptionType<
    typeof Demo,
    {
      transformUpdateAfter: (a: any, b: any) => void
      transformUpdateQueryRet: (a: any) => 6
    }
  >
> //FIXME

type sub = SubObject<opt, 'transformUpdateAfter' | 'transformUpdateQueryRet'>

type ts = Prettify<DemoTransformKeys<opt>>

type OmitMethod<T> = Omit<T, 'method'>
export function Create3<T extends ClassType<T>, K>(
  // options: K & DemoTransformKeys<OptionType<T, K>>
  options: K
) {
  return Action3<T, K>({
    ...options,
    method: 'create',
    action: 'create',
  })
}
type IsFunction<T> = T extends (...args: any) => any ? T : never

type DemoTransformKeys2<T extends SubObject<T, 'a' | 'b'>> = {
  [K in keyof T]: K extends FieldName<T, 'b'>
    ? (
        arg: ReturnType<IsFunction<T[FieldName<T, 'a'>]>>
      ) => ReturnType<IsFunction<T[FieldName<T, 'b'>]>> // If the key is 'a', set the output type of 'b' to the output type of 'a'
    : T[K]
}

type t = DemoTransformKeys2<{
  a: () => 123
  b: () => ''
}>

type ActionOption = {
  a: () => {
    num: number
  }
  b: (arg) => string
}

export function Action4<T, K>(
  options: ExtendsOnly<K, DemoTransformKeys2<ActionOption>>
) {
  return function classDecorator(target: T) {}
}

@Action4({
  a: () => ({
    num: 0,
  }),
  b: () => '',
})
@Create3({
  transformUpdateAfter: (a, b) => '666',
  transformUpdateQueryRet: (a) => 6,
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
