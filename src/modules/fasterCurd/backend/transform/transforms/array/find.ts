import { TransformFunction } from '../..'
import { createTransform } from '../index'

function find<T>(
  condition: (item: T) => boolean
): TransformFunction<T[], T | undefined> {
  // return function findTransformer(array: T[]): T | undefined {
  //   return array.find(condition)
  // }
  return createTransform((array: T[]) => {
    return array.find(condition)
  })
}

export default find
