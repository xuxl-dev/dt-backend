import { createTransform } from '.'
import { TransformFunction } from '..'

function join<T extends string>(
  separator: string = ','
): TransformFunction<T[], string> {
  return createTransform((obj: T[]) => {
    const joinedString = obj.join(separator)
    return joinedString
  })
}

export default join
