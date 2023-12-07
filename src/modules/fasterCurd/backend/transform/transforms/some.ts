import { TransformFunction } from "../builder";

function some<T>(condition: (item: T) => boolean): TransformFunction<T[], boolean> {
  return function someTransformer(array: T[]): boolean {
    return array.some(condition);
  };
}

export default some;
