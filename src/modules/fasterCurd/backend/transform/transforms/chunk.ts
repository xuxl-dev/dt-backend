import { createTransform } from '.'
import { TransformFunction } from '../builder'

function split<T>(chunkSize: number): TransformFunction<T[], T[][]> {
  // return function splitTransformer(array: T[]): T[][] {
  //   const result: T[][] = [];
  //   for (let i = 0; i < array.length; i += chunkSize) {
  //     result.push(array.slice(i, i + chunkSize));
  //   }
  //   return result;
  // };
  return createTransform((array: T[]) => {
    const result: T[][] = []
    for (let i = 0; i < array.length; i += chunkSize) {
      result.push(array.slice(i, i + chunkSize))
    }
    return result
  })
}

export default split
