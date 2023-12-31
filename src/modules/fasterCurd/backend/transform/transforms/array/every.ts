import { createTransform } from '..'
import { TransformFunction } from '../../builder'

function every<T>(
  condition: (item: T) => boolean
): TransformFunction<T[], boolean> {
  return createTransform(
    (array: T[]) => {
      return array.every(condition)
    },
    { name: every.name }
  )
}

export default every
