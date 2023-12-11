import { createTransform } from '..'
import { TransformFunction } from '../..'

function sort<T>(
  compareFn: (a: T, b: T) => number
): TransformFunction<T[], T[]> {
  return createTransform((array: T[]) => {
    return array.slice().sort(compareFn)
  })
}

export default sort
