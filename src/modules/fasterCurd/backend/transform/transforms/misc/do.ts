import { Warpper, createTransform } from '..'
import { TransformFunction } from '../..'

function Do<T, A>(transform: (obj: T) => A): TransformFunction<T, A> {
  return createTransform(
    (obj: T) => {
      return transform(obj)
    },
    { name: Do.name }
  )
}

export default Do
