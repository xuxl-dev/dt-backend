import { createTransform } from '..'
import { TransformFunction } from '../..'

function sortObjectKeys<T extends object>(): TransformFunction<T, T> {
  return createTransform(
    (obj: T) => {
      const result: T = {} as T
      Object.keys(obj)
        .sort()
        .forEach((key) => {
          result[key] = obj[key]
        })
      return result
    },
    { name: sortObjectKeys.name }
  )
}

export default sortObjectKeys
