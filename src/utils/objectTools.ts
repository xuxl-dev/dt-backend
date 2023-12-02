type ObjectWithNullableProps<T> = {
  [K in keyof T]: T[K] | null
}

export function deconstrcuOrNull<T>(obj: T): ObjectWithNullableProps<T> {
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
  if (!obj) return defaults

  // recursively merge objects
  const result = { ...obj }
  Object.keys(defaults).forEach((key) => {
    if (typeof defaults[key] !== 'object') return

    if (typeof defaults[key] === 'object') {
      result[key] = mergeDefault(obj[key], defaults[key])
      return
    }

    result[key] = obj[key] ?? defaults[key]
  })

  return result as T
}
