import { createTransform } from '..'
import { TransformFunction } from '../..'

function sort<T extends object>(key: keyof T): TransformFunction<T[], T[]> {
  return createTransform((array: T[]) => {
    return array.slice().sort((a, b) => {
      const valueA = a[key]
      const valueB = b[key]

      if (valueA < valueB) {
        return -1
      } else if (valueA > valueB) {
        return 1
      } else {
        return 0
      }
    })
  })
}

export default sort
