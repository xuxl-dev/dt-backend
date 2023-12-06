import { TransformFunction } from '..';

function forAll<T>(predicate: (value: T) => boolean): TransformFunction<T[], boolean> {
  return function forallFunction(arr: T[]): boolean {
    return arr.every(predicate);
  };
}

export default forAll;
