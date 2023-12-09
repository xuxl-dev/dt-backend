import { createTransform } from '..'
import { TransformFunction } from '../..'

function reduce<T = any, U = any>(
  reducer: (accumulator: U, value: T) => U,
  initial: U
): TransformFunction<T[], U> {
  // return function reduceFunction(arr: T[]): U {
  //   return arr.reduce(reducer, initial);
  // };

  return createTransform((arr: T[]) => {
    return arr.reduce(reducer, initial)
  })
}

export default reduce
