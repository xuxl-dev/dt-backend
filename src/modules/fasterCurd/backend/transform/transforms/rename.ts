import { TransformFunction } from '..'

function rename<T = any>(renames: {
  [key in keyof T]: string
}): TransformFunction<T, { [key: string]: T[keyof T] }> { // TODO: optimize type
  return function renameFunction(obj: T): { [key: string]: T[keyof T] } {
    const renamedObj = {} as { [key: string]: T[keyof T] }
    for (const key in obj) {
      if (obj.hasOwnProperty(key) && renames[key]) {
        renamedObj[renames[key]] = obj[key]
      }
    }
    return renamedObj
  }
}

export default rename
