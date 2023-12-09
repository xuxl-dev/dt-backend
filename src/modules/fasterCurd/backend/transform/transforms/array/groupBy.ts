import { createTransform } from '..'
import { TransformFunction } from '../..'

function groupBy<T>(
  key: keyof T | ((t: T) => string | number)
): TransformFunction<T[], Record<string, T[]>> {
  return createTransform((array: T[]) => {
    const grouped: Record<string, T[]> = {}

    if (typeof key === 'function') {
      array.forEach((item) => {
        const keyValue = String(key(item))
        if (grouped[keyValue]) {
          grouped[keyValue].push(item)
        } else {
          grouped[keyValue] = [item]
        }
      })

      return grouped
    } else if (typeof key === 'string') {
      array.forEach((item) => {
        const keyValue = String(item[key])
        if (grouped[keyValue]) {
          grouped[keyValue].push(item)
        } else {
          grouped[keyValue] = [item]
        }
      })
      return grouped
    } else {
      throw new Error('key must be a string or a function')
    }
  })
}

export default groupBy
