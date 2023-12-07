import { TransformFunction } from '..'

function find<T>(
  condition: (item: T) => boolean
): TransformFunction<T[], T | undefined> {
  return function findTransformer(array: T[]): T | undefined {
    return array.find(condition)
  }
}

export default find
