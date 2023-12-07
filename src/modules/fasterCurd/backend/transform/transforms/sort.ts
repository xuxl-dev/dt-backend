import { createTransform } from '.'
import { TransformFunction } from '..'

function sort<T>(
  compareFn: (a: T, b: T) => number
): TransformFunction<T[], T[]> {
  // return function sorter(array: T[]): T[] {
  //   return array.slice().sort(compareFn)
  // }
  return createTransform((array: T[]) => {
    return array.slice().sort(compareFn)
  })
}

export default sort
