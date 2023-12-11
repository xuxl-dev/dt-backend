import { createTransform } from '..'
import { TransformFunction } from '../..'

function group<T>(): TransformFunction<T[], Record<string, T[]>> {
  return createTransform((array: T[]) => {
    const grouped: Record<string, T[]> = {}
    // console.log('array', array)
    array.forEach((item) => {
      const keyValue = String(item)
      if (grouped[keyValue]) {
        grouped[keyValue].push(item)
      } else {
        grouped[keyValue] = [item]
      }
    })

    return grouped
  }, {name: group.name})
}

export default group
