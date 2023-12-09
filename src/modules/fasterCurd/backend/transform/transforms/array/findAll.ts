import { TransformFunction } from '../..'
import { createTransform } from '../index'

function findAll<T>(
  condition: (item: T) => boolean
): TransformFunction<T[], T[] | undefined> {
  // return function findTransformer(array: T[]): T | undefined {
  //   return array.find(condition)
  // }
  return createTransform((array: T[]) => {
    return array.filter(condition)
  })
}

export default findAll
