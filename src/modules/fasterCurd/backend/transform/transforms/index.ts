import { TransformFunction } from '..'

import {
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
      // this object has dropped context
      return transformFn(obj, null)
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
export { default as apply, applyInplcae } from './apply'
export { default as default } from './default'
export { default as filter } from './filter'
export { default as omit } from './omit'
export { default as rename } from './rename'
export { default as reduce } from './reduce'
export { default as forAll } from './forAll'
export { default as forEach } from './forEach'
export { default as sort } from './sort'
export { default as sortBy } from './sortBy'
export { default as map } from './map'
export { default as groupBy } from './groupBy'
export { default as chunk } from './chunk'
export { default as find } from './find'
export { default as every } from './every'
export { default as some } from './some'
export { default as keys } from './keys'
export { dropContext, getContext, withContext } from './withContext'
export { default as join } from './join'
export { default as extract } from './extract'
export { default as objectify } from './objectify'
export { default as findAll } from './findAll'
export { default as group } from './group'
export { default as forallValues } from './forallValues'
