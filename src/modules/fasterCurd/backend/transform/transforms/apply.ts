import { createTransform } from '.'
import { TransformFunction } from '..'

function apply<T = any, U = any>(
  applier: (obj: T) => U
): TransformFunction<T, U> {
  return createTransform((obj: T) => {
    return applier(obj)
  })
}

export default apply
