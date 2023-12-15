import { createTransform } from '..'
import { TransformFunction } from '../..'

function pick<T extends object, A extends (keyof T)[]>(
  ...fields: A
): TransformFunction<T, Pick<T, A[number]>> {
  return createTransform(
    (obj: T) => {
      const pickedObj = {} as Pick<T, A[number]>
      fields.forEach((field) => {
        if (obj.hasOwnProperty(field)) {
          pickedObj[field] = obj[field]
        }
      })
      return pickedObj
    },
    { name: pick.name }
  )
}

export default pick
