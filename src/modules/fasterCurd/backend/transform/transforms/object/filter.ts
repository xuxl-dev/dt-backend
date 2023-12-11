import { createTransform } from '..'
import { TransformFunction } from '../..'

function filter<T = any>(
  predicate: (value: T[keyof T]) => boolean
): TransformFunction<T, Partial<T>> {
  return createTransform((obj: T) => {
    const filteredObj = {} as Partial<T>
    for (const key in obj) {
      if (obj.hasOwnProperty(key) && predicate(obj[key])) {
        filteredObj[key] = obj[key]
      }
    }
    return filteredObj
  })
}

export default filter
