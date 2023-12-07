import { createTransform } from '.'
import { TransformFunction } from '..'

function defaults<T = any>(defaultValues: Partial<T>): TransformFunction<T, T> {
  // return function defaultsFunction(obj: T): T {
  //   return { ...defaultValues, ...obj }
  // }
  return createTransform((obj: T) => {
    return { ...defaultValues, ...obj }
  })
}

export default defaults
