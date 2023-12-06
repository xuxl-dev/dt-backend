import { TransformFunction } from '..'

type SimpleObj = Record<string, any>

function SafePicker<T extends SimpleObj, K extends keyof T>(fields: K[]) {
  return function picker(obj: T): Pick<T, K> {
    const pickedObj: Partial<Pick<T, K>> = {}
    fields.forEach((field) => {
      if (obj.hasOwnProperty(field)) {
        pickedObj[field] = obj[field]
      }
    })
    return pickedObj as Pick<T, K>
  }
}

function pick<T, R>(fields: string[]): TransformFunction<T, R> {
  return function picker(obj: T): R {
    const pickedObj = {} as R;
    fields.forEach((field) => {
      if (obj.hasOwnProperty(field)) {
        pickedObj[field] = obj[field];
      }
    });
    return pickedObj as { [K in keyof R]: R[K] }
  };
}

function pick2<T = any, A extends (keyof T)[] = any>(fields: A): TransformFunction<T, Pick<T, A[number]>> {
  return function picker(obj: T): Pick<T, A[number]> {
    const pickedObj = {} as Pick<T, A[number]>;
    fields.forEach((field) => {
      if (obj.hasOwnProperty(field)) {
        pickedObj[field] = obj[field];
      }
    });
    return pickedObj;
  };
}
export default pick2

// 示例用法
interface ExampleObject {
  name: string
  age: number
  city: string
}

const examplePicker = SafePicker(['name'])

const exampleObj: ExampleObject = {
  name: 'John',
  age: 25,
  city: 'New York',
}

const pickedResult = examplePicker(exampleObj)

// pickedResult 的类型为 { name: string, age: number }，保留了原始对象的类型信息
console.log(pickedResult)
