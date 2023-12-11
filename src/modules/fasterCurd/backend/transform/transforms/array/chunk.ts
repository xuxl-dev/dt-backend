import { createTransform } from '..'
import { TransformFunction } from '../../builder'

function split<T>(chunkSize: number): TransformFunction<T[], T[][]> {
  return createTransform(
    (array: T[]) => {
      const result: T[][] = []
      for (let i = 0; i < array.length; i += chunkSize) {
        result.push(array.slice(i, i + chunkSize))
      }
      return result
    },
    { name: split.name }
  )
}

export default split
