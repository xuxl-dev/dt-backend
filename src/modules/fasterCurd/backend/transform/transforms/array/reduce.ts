import { createTransform } from '..'
import { TransformFunction } from '../..'

function reduce<T = any, U = any>(
  reducer: (accumulator: U, value: T) => U,
  initial: U
): TransformFunction<T[], U> {
  return createTransform(
    (arr: T[]) => {
      return arr.reduce(reducer, initial)
    },
    { name: reduce.name }
  )
}

export default reduce
