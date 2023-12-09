import { createTransform } from '..'
import { TransformFunction } from '../..'

function toSet<T>(): TransformFunction<T[], Set<T>> {
  return createTransform((arr: T[]) => new Set(arr))
}

export default toSet
