import { createTransform } from '.'
import { TransformFunction } from '../builder'

function every<T>(
  condition: (item: T) => boolean
): TransformFunction<T[], boolean> {
  // return function everyTransformer(array: T[]): boolean {
  //   return array.every(condition)
  // }
  return createTransform((array: T[]) => {
    return array.every(condition)
  })
}

export default every
