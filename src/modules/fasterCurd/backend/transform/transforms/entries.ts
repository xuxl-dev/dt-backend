import { createTransform } from '.'
import { TransformFunction } from '..'

function entries<T>(): TransformFunction<T, [keyof T, T[keyof T]][]> {
  // return function entriesTransformer(obj: T): [keyof T, T[keyof T]][] {
  //   return Object.entries(obj) as [keyof T, T[keyof T]][]
  // }
  return createTransform((obj: T) => {
    return Object.entries(obj) as [keyof T, T[keyof T]][]
  })
}

export default entries
