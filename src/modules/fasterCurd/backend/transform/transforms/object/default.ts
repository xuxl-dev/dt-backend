import { createTransform } from '..'
import { TransformFunction } from '../..'

function defaults<T = any>(defaultValues: Partial<T>): TransformFunction<T, T> {
  return createTransform(
    (obj: T) => {
      return { ...defaultValues, ...obj }
    },
    { name: defaults.name }
  )
}

export default defaults
