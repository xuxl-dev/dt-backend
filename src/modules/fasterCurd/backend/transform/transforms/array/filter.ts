import { createTransform } from '..'
import { TransformFunction } from '../..'

function filter<T>(
  predicate: (value: T) => boolean
): TransformFunction<T[], T[]> {
  return createTransform((arr: T[]) => arr.filter(predicate), {
    name: filter.name,
  })
}

export default filter
