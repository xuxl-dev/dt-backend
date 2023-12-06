import { TransformFunction } from ".."

function omit<T>(...keys: (keyof T)[]) {
  return ((value: any) => {
    return keys.reduce((result, key) => {
      delete result[key]
      return result
    }, value) 
  })
}

export default omit