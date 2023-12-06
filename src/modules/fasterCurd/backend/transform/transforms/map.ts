import { TransformFunction } from '..';

function map<T = any, U = any>(mapper: (obj: T) => U): TransformFunction<T, U> {
  return function mapperFunction(obj: T): U {
    return mapper(obj);
  };
}

export default map;
