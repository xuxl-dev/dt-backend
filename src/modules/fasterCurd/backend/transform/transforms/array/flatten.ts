import { createTransform } from '..'
import { TransformFunction } from '../..'

function flatten<T extends Array<any>>(): TransformFunction<T[], T> {
  return createTransform(
    (arrays: T[]) => arrays.reduce((acc, arr) => acc.concat(arr), [] as T) as T
  )
}

export default flatten
