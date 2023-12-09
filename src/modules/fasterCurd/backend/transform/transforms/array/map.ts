import { createTransform } from '..'
import { TransformFunction } from '../..'
import { isTransformFunction } from '../../builder'

function map<T, A>(transform: (value: T) => A): TransformFunction<T[], A[]> {
  return createTransform((array: T[]) => {
    return array.map(transform)
  })
}

export default map
