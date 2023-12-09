import { createTransform } from '..'
import { TransformFunction } from '../..'

function toArray<T extends object>(): TransformFunction<
  T,
  T extends Set<infer U> ? U[] : T extends Record<string, infer V> ? V[] : never
> {
  return createTransform((input: T) => {
    if (input instanceof Set) {
      return Array.from(input.keys()) as any
    } else if (typeof input === 'object' && input !== null) {
      return Object.values(input) as any
    } else {
      throw new Error('Unsupported input type')
    }
  })
}

export default toArray
