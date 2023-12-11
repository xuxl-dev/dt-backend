import { createTransform } from '..'
import { TransformFunction } from '../..'

function entries<T>(): TransformFunction<T, [keyof T, T[keyof T]][]> {
  return createTransform(
    (obj: T) => {
      return Object.entries(obj) as [keyof T, T[keyof T]][]
    },
    { name: entries.name }
  )
}

export default entries
