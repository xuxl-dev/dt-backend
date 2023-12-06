type ITransform<U = any, V = any> = (data: U) => V

type IsTransform<T> = T extends ITransform ? T : never
type IsTransform2<T> = T extends ITransform ? T : never
type IsTransforms<T> = T extends ITransform[] ? T : never
/**
 * T has 0 elements: return A
 * T has 1 element: return the return type of the transform function
 * T has more than 1 element: return a function
 */
type ConstrainedTransformedType<A, T extends ITransform[]> = T extends []
  ? A
  : T extends [infer F]
  ? ReturnType<IsTransform<F>>
  : T extends [infer F, ...infer R]
  ? ConstrainedTransformedType<ReturnType<IsTransform<F>>, IsTransforms<R>>
  : never

function transform<T extends ITransform[]>(...transforms: T) {
  return <A>(data: A) => {
    return transforms.reduce((acc, transform) => {
      return transform(acc)
    }, data) as ConstrainedTransformedType<A, T>
  }
}

function pick<T extends Record<string, any>>(
  ...fields: Extract<keyof T, string>[]
) {
  return <A extends T>(data: A) => {
    return fields.reduce((acc, field) => {
      acc[field] = data[field]
      return acc
    }, {} as Pick<A, (typeof fields)[number]>)
  }
}

const mypick = pick('a', 'b', 'c')
const demoObj = {
  a: 1,
  b: 2,
  c: 3,
  d: 4,
}

// function onetransform<T extends <Arg extends number>(arg: Arg) => any>(transform: T) {
//   return <A>(data: A) => {
//     return transform(data as any) as ReturnType<T>;
//   };
// }

// function doubleNumber(num: number): number {
//   return num * 2;
// }

// // 使用 onetransform 创建一个新的转换函数
// const doubledTransform = onetransform(doubleNumber);

// // 测试新的转换函数
// const result = doubledTransform(5);

type TransformFunction<T, V> = (input: T) => V;

function onetransform<T, V>(transform: TransformFunction<T, V>) {
  return <A>(data: A): ReturnType<TransformFunction<T, V>> => {
    return transform(data as unknown as T) as ReturnType<TransformFunction<T, V>>;
  };
}

// 定义一个转换函数，将字符串转换为大写
function uppercaseTransformer(str: string): string {
  return str.toUpperCase();
}

// 定义一个转换函数，将数字加倍
function doubleNumberTransformer(num: number): number {
  return num * 2;
}

// 使用 onetransform 创建字符串转换器
const uppercaseTransform = onetransform(uppercaseTransformer);

// 使用 onetransform 创建数字加倍转换器
const doubleNumberTransform = onetransform(doubleNumberTransformer);

// 测试字符串转换器
const resultString= uppercaseTransform("hello");
console.log(resultString); // 输出 "HELLO"

// 测试数字加倍转换器
const resultNumber = doubleNumberTransform(5);
console.log(resultNumber); // 输出 10