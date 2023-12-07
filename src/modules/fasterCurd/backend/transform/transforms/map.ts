import { createTransform } from '.'
import { TransformFunction } from '..'

function map<T, A>(
  transform: TransformFunction<T, A>
): TransformFunction<T[], A[]> {
  // return function mapper(array: T[]): A[] {
  //   return array.map(transform);
  // };
  return createTransform((array: T[]) => {
    return array.map(transform)
  })
}

export default map
