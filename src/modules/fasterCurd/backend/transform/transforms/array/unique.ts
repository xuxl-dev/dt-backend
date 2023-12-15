import { createTransform } from '..'
import { TransformFunction } from '../..'

function unique<T>(): TransformFunction<T[], T[]> {
  return createTransform(
    (array: T[]) => {
      return Array.from(new Set(array))
    },
    { name: unique.name }
  )
}

export default unique
