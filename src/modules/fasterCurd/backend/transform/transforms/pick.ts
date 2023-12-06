import { TransformFunction } from ".."

type SafePick<T, K> = {
  [P in keyof T as P extends K ? P : never]: T[P]
}

function pick<T, K>(...keys: K[]) {
  return (data: T) => {
    const result = {} as any
    for (const key of keys) {
      result[key] = data[key as any]
    }
    return result as SafePick<T, K>
  }
}

export default pick

const testObj = {
  a: 1,
  b: 2,
  c: 3,
  d: 4,
}

const test = pick<typeof testObj, any>('a', 'b', 'c')(testObj)