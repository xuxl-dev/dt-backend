import { createTransform } from '.'
import { TransformFunction } from '..'

function forEach<T = any, U = any>(
  transform: (value: T) => U
): TransformFunction<T[], U[]> {
  // return function forEachFunction(arr: T[]): U[] {
  //   return arr.map(transform);
  // };

  return createTransform((arr: T[]) => {
    return arr.map(transform)
  })
}

export default forEach
