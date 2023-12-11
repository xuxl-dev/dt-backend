import { createTransform } from '..'
import { TransformFunction } from '../..'

function apply<T, U>(
  applier: (obj: T) => U,
  inPlace: boolean = true
): TransformFunction<T, U> {
  if (inPlace) {
    return createTransform(
      (obj: T) => {
        return applier(obj)
      },
      { name: apply.name + 'InPlace' }
    )
  } else {
    return createTransform(
      (obj: T) => {
        return applier({ ...obj })
      },
      { name: apply.name }
    )
  }
}

export default apply
