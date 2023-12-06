export type Only<T, K extends keyof T> = {
  [P in keyof T]: P extends K ? T[P] : never
}

export type Never<T> = {
  [P in keyof T]: never
}

export type OnlyOneOf<T> = {
  [P in keyof T]: T[P] extends any[] ? T[P] : never
}[keyof T]

/**
 *
 */
// export type ExtendsOnly<T, U> = {
//   [K in keyof T]: K extends keyof U ? T[K] : never;
// };

// export type ExtendsOnly<T, U> = ExcludeNever<{
//   [K in keyof T | keyof U]: K extends keyof T
//     ? K extends keyof U
//       ? T[K]
//       : never
//     : K extends keyof U
//     ? U[K] | undefined
//     : never
// }>

export type ExtendsOnly<T, U> = ExcludeNever<{
  [K in keyof T | keyof U]: K extends keyof T
    ? K extends keyof U
      ? U[K] extends T[K] ? U[K] : T[K]
      : never
    : K extends keyof U
    ? U[K] | undefined
    : never;
}>;




export type ExcludeNever<T> = {
  [K in keyof T as T[K] extends never ? never : K]: T[K]
}

/**
 * Intersection of T and U, preserve value of T
 */
export type Intersection<T, U> = {
  [K in Extract<keyof T, keyof U>]: T[K]
}


export type Prettify<T> = {
  [K in keyof T]: T[K];
} & {};

export type Prettify2<T> = {
  // [K in keyof T]: T[K];
  [K in keyof T]: T[K] extends object ? Prettify2<T[K]> : T[K];
  // eslint-disable-next-line @typescript-eslint/no-redundant-type-constituents
} & unknown;
type TupleToObject<T extends readonly any[]> = {
  [K in T[number]]: T[number]
}
type UnionToIntersection<U> = (U extends any ? (k: U) => void : never) extends (
  k: infer I
) => void ? I : never
type LastOf<T> = UnionToIntersection<
  T extends any ? () => T : never
> extends () => infer R ? R : never
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
> = KS extends [infer K, ...infer KT] ? ObjValueTuple<T, KT, [...R, T[K & keyof T]]> : R
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
) => void ? X : never
type GrowToSize<T, A extends Array<T>, N extends number> = {
  0: A
  1: GrowToSize<T, Grow<T, A>, N>
}[A['length'] extends N ? 0 : 1]

export type FixedArray<T, N extends number> = GrowToSize<T, [], N>
type arr<T extends number> = FixedArray<any, T>
type StorageOf<T extends number> = TupleToStorage<arr<T>>

export type SubObject<T, K extends keyof T> = {
  [P in K]: T[P]
}
export type FieldName<T, K extends keyof T> = K extends keyof T ? K : never
export type IsFunction<T> = T extends (...args: any) => any ? T : never
export type FieldsOrReg<T> = (keyof T)[] | RegExp
export type Fields<T> = (keyof T)[]
type Field<T> = keyof T
type ElementOf<T> = T extends Array<infer E> ? E : never

