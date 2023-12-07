// import { TransformFunction } from '..';

// function values<T = any>(): TransformFunction<Record<string, T>, T[]> {
//   return function valuesFunction(obj: Record<string, T>): T[] {
//     return Object.values(obj);
//   };
// }

// export default values;

import { createTransform } from '.'
import { TransformFunction } from '..'

type TupleFromObject<T> = { [K in keyof T]: [T[K]] }[keyof T]
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
function values<T extends { [key: string]: any }>(): TransformFunction<
  T,
  ObjValueTuple<T>
> {
  // return function valuesFunction(obj: T): ObjValueTuple<T> {
  //   return Object.values(obj) as ObjValueTuple<T>
  // }
  return createTransform((obj: T) => {
    return Object.values(obj) as ObjValueTuple<T>
  })
}

export default values
