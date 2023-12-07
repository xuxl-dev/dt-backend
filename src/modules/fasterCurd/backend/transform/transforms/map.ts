import { createTransform } from '.'
import { TransformFunction } from '..'

function map<T = any, U = any>(mapper: (obj: T) => U): TransformFunction<T, U> {
  return createTransform((obj: T) => {
    return mapper(obj)
  })
}

export default map
