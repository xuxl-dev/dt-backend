import { createTransform } from '..'
import { TransformFunction } from '../../builder'

function some<T>(
  condition: (item: T) => boolean
): TransformFunction<T[], boolean> {
  return createTransform(
    (array: T[]) => {
      return array.some(condition)
    },
    { name: some.name }
  )
}

export default some
