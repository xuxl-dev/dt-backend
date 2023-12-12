import { cloneDeep, defaultsDeep } from 'lodash'

type ObjectWithNullableProps<T> = {
  [K in keyof T]: T[K] | null
}

export function deconstrcuOrNull<T extends object>(obj: T): ObjectWithNullableProps<T> {
  const result: ObjectWithNullableProps<T> = {} as ObjectWithNullableProps<T>

  Object.keys(obj).forEach((key) => {
    result[key as keyof T] = obj[key as keyof T] ?? null
  })

  return result
}

export function isCallable(obj: any): obj is CallableFunction {
  return (
    typeof obj === 'function' ||
    !!(obj && obj.call && typeof obj.call === 'function')
  )
}

export function mergeDefault<T>(obj: Partial<T>, defaults: T): T {
  const _obj = cloneDeep(obj)
  return defaultsDeep(_obj, defaults)
}
