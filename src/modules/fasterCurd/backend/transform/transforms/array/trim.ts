import { createTransform } from '..'
import { TransformFunction } from '../..'

function trim<T>(length: number): TransformFunction<T[], T[]> {
  return createTransform((array: T[]) => array.slice(0, length));
}


export default trim
