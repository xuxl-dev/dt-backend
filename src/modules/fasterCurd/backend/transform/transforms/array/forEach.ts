import { createTransform } from '..'
import { TransformFunction } from '../..'

function forEach<T = any, U = any>(
  transform: (value: T) => U
): TransformFunction<T[], U[]> {
  return createTransform((arr: T[]) => {
    return arr.map(transform)
  })
}

export default forEach
