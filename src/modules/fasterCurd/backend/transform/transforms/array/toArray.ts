import { createTransform } from '..'
import { TransformFunction } from '../..'

function toArray<T extends object | string>(): TransformFunction<
  T,
  T extends Set<infer U>
    ? U[]
    : T extends Record<string, infer V>
    ? V[]
    : T extends string
    ? string[]
    : never
> {
  return createTransform(
    (input: T) => {
      if (input instanceof Set) {
        return Array.from(input.keys()) as any
      } else if (typeof input === 'object' && input !== null) {
        return Object.values(input) as any
      } else if (typeof input === 'string') {
        return input.split('') as any
      } else {
        throw new Error(`Unsupported input type ${typeof input}`)
      }
    },
    { name: toArray.name }
  )
}

export default toArray
