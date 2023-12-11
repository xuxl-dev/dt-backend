import { TransformFunction } from '../..'
import { createTransform } from '../index'

function find<T>(
  condition: (item: T) => boolean
): TransformFunction<T[], T | undefined> {
  return createTransform((array: T[]) => {
    return array.find(condition)
  })
}

export default find
