import { merge, omit } from 'lodash'
import { createTransform } from '..'
import { TransformFunction } from '../..'

type ModifiedPart<T, A extends Partial<{ [key in keyof T]: string }>> = {
  [K in keyof A]: K extends keyof T ? { [P in A[K]]: T[K] } : never
}[keyof A]

// type UnModifiedPart<T, A extends Partial<{ [key in keyof T]: string }>> = {
//   [K in keyof T]: K extends keyof A ? never : T[K]
// }
type UnModifiedPart<T, A extends Partial<{ [key in keyof T]: string }>> = {
  [K in Exclude<keyof T, keyof A>]: T[K]
}

type MappedName<
  T,
  A extends Partial<{ [key in keyof T]: string }>
> = ModifiedPart<T, A> & UnModifiedPart<T, A>

function rename<T, A extends Partial<{ [key in keyof T]: string }>>(
  renames: A
): TransformFunction<T, MappedName<T, A>> {
  return createTransform(
    (obj: T) => {
      const renamedObj = {} as any
      for (const key in obj) {
        if (obj.hasOwnProperty(key) && renames[key]) {
          renamedObj[renames[key]] = obj[key]
        }
      }
      //TODO remove dependency on lodash
      return merge(renamedObj, omit(obj as object, Object.keys(renames)))
    },
    { name: rename.name }
  )
}

export default rename
