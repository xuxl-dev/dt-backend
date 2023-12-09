import { Warpper, createTransform } from '..'
import { TransformFunction } from '../..'

function Do<T, A>(transform: (obj: T) => A): TransformFunction<T, A> {
  // return function applier(obj?: T): A {
  //   return transform(obj)
  // }
  return createTransform((obj: T) => {
    return transform(obj)
  })
}

export default Do
