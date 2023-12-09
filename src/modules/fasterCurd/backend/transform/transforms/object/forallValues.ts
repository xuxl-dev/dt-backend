import { createTransform } from '..'
import { TransformFunction } from '../..'

function forallValues<T, U>(
  transform: (value: T) => U
): TransformFunction<{ [key: string]: T }, { [key: string]: U }> {
  return createTransform((obj: { [key: string]: T }) => {
    const result: { [key: string]: U } = {}
    for (const key in obj) {
      if (obj.hasOwnProperty(key)) {
        result[key] = transform(obj[key])
      }
    }
    return result
  })
}

export default forallValues