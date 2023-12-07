import { TransformFunction } from '..';

function apply<T, A>(transform: TransformFunction<T, A>): TransformFunction<T[], void> {
  return function applier(array: T[]): void {
    array.map(transform);
  };
}

export default apply;
