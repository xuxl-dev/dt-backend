import { createTransform } from '.'
import { TransformFunction } from '..'

function keys<T extends object>(): TransformFunction<T, (keyof T)[]> {
  // return function keysTransformer(obj: T): (keyof T)[] {
  //   return Object.keys(obj) as (keyof T)[];
  // };
  return createTransform((obj: T) => {
    return Object.keys(obj) as (keyof T)[]
  })
}

export default keys
