import { TransformFunction } from '../..'
import { createTransform } from '../index'

function findAll<T>(
  condition: (item: T) => boolean
): TransformFunction<T[], T[] | undefined> {
  return createTransform((array: T[]) => {
    return array.filter(condition)
  })
}

export default findAll
