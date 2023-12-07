import { createTransform } from '.'
import { TransformFunction } from '..'

function groupBy<T>(key: keyof T): TransformFunction<T[], Record<string, T[]>> {
  // return function groupByTransformer(array: T[]): Record<string, T[]> {
  //   const grouped: Record<string, T[]> = {};

  //   array.forEach((item) => {
  //     const keyValue = String(item[key]);
  //     if (grouped[keyValue]) {
  //       grouped[keyValue].push(item);
  //     } else {
  //       grouped[keyValue] = [item];
  //     }
  //   });

  //   return grouped;
  // };
  return createTransform((array: T[]) => {
    const grouped: Record<string, T[]> = {}

    array.forEach((item) => {
      const keyValue = String(item[key])
      if (grouped[keyValue]) {
        grouped[keyValue].push(item)
      } else {
        grouped[keyValue] = [item]
      }
    })

    return grouped
  })
}

export default groupBy
