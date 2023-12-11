import { TransformFunction } from '../..'
import { createTransform } from '../index'

function findAll<T>(
  condition: (item: T) => boolean
): TransformFunction<T[], T[]> { //TODO null check?
  return createTransform(
    (array: T[]) => {
      return array.filter(condition)
    },
    { name: findAll.name }
  )
}

export default findAll
