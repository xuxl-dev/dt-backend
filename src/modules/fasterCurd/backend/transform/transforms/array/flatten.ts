import { createTransform } from '..'
import { TransformFunction } from '../..'

function flatten<T extends []>(): TransformFunction<T[], T> {
  return createTransform(
    (arrays: T[]) => arrays.reduce((acc, arr) => acc.concat(arr) as T, [] as T) as T,
    { name: flatten.name }
  )
}

export default flatten
