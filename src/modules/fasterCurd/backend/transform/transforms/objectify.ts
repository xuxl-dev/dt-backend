import { createTransform } from '.';
import { TransformFunction } from '..';

// Inferring the tuple structure of the input array
type TupleType<T extends any[]> = T;

function objectify<T extends any[]>(): TransformFunction<TupleType<T>, Record<number, T[number]>> {
  return createTransform((arr: TupleType<T>) => {
    const result: Record<number, T[number]> = {};
    arr.forEach((value, index) => {
      result[index] = value;
    });
    return result;
  });
}

export default objectify;
