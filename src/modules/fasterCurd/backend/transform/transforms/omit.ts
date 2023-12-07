import { TransformFunction } from '..';

function omit<T = any, A extends (keyof T)[] = any>(...fields: A): TransformFunction<T, Omit<T, A[number]>> {
  return function omittor(obj: T): Omit<T, A[number]> {
    const omittedObj = { ...obj } as Omit<T, A[number]>;
    fields.forEach((field) => {
      if (omittedObj.hasOwnProperty(field)) {
        delete omittedObj[field as any];
      }
    });
    return omittedObj;
  };
}

export default omit;