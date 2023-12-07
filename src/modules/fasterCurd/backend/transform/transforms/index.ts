import { TransformFunction } from '..'
import {
  getContext,
  getInternalContext,
  beforeTransformToken,
  afterTransformToken,
} from './withContext'

export type InternalCtx = {
  obj: any
  result: any
}

export function createTransform<T, U>(
  transformFn: (obj: T, context: any) => U
): TransformFunction<T, U> {
  return function transformer(obj: T): U {
    const context = getInternalContext(obj)
    if (!context) {
      console.warn('missing internal context!')
    }
    const ctx: InternalCtx = {
      obj,
      result: null,
    }

    context?.[beforeTransformToken]?.forEach((fn) => fn(ctx))

    const result = transformFn(obj, context)

    ctx.result = result

    context?.[afterTransformToken]?.forEach((fn) => fn(ctx))

    return result
  }
}

export { default as values } from './values'
export { default as pick } from './pick'
export { default as map } from './map'
export { default as default } from './default'
export { default as filter } from './filter'
export { default as omit } from './omit'
export { default as rename } from './rename'
export { default as reduce } from './reduce'
export { default as forAll } from './forAll'
export { default as forEach } from './forEach'
export { default as sort } from './sort'
export { default as sortBy } from './sortBy'
export { default as apply } from './apply'
export { default as groupBy } from './groupBy'
export { default as chunk } from './chunk'
export { default as find } from './find'
export { default as every } from './every'
export { default as some } from './some'
export { default as keys } from './keys'
export { default as withContext, getContext } from './withContext'
