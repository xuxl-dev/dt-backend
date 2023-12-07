import { createTransform } from '.'
import { TransformFunction } from '..'

function pick<T = any, A extends (keyof T)[] = any>(
  ...fields: A
): TransformFunction<T, Pick<T, A[number]>> {
  return createTransform((obj: T) => {
    const pickedObj = {} as Pick<T, A[number]>
    fields.forEach((field) => {
      if (obj.hasOwnProperty(field)) {
        pickedObj[field] = obj[field]
      }
    })
    return pickedObj
  })
}

export default pick
