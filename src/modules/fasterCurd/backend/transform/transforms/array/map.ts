import { createTransform } from '..'
import { TransformFunction } from '../..'

function map<T, A>(transform: (value: T) => A): TransformFunction<T[], A[]> {
  return createTransform(
    (array: T[]) => {
      return array.map(transform)
    },
    { name: 'map' }
  )
}

export default map
