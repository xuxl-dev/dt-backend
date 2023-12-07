import { createTransform } from '.'
import { TransformFunction } from '..'

function pick<T = any, A extends (keyof T)[] = any>(
  ...fields: A
): TransformFunction<T, Pick<T, A[number]>> {
  // return function picker(obj: T): Pick<T, A[number]> {
  //   const pickedObj = {} as Pick<T, A[number]>
  //   fields.forEach((field) => {
  //     if (obj.hasOwnProperty(field)) {
  //       pickedObj[field] = obj[field]
  //     }
  //   })
  //   return pickedObj
  // }

  return createTransform(
    (obj: T) => {
      const pickedObj = {} as Pick<T, A[number]>
      fields.forEach((field) => {
        if (obj.hasOwnProperty(field)) {
          pickedObj[field] = obj[field]
        }
      })
      return pickedObj
    }
  )
}

export default pick
