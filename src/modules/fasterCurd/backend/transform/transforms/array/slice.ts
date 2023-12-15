import { createTransform } from '..'
import { TransformFunction } from '../..'

function slice<T>(m: number, n: number): TransformFunction<T[], T[]> {
  return createTransform((array: T[]) => array.slice(m, n + 1), {
    name: slice.name,
  })
}

export default slice
