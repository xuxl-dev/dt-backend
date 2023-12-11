import { TransformFunction } from '..'

import {
  getWrapperContext,
  beforeTransformToken,
  afterTransformToken,
} from './misc/context'

export type InternalCtx = {
  obj: any
  result: any
}

export type Warpper<T> = {
  value: T
}

export function createTransform<T, U>(
  transformFn: (obj: T) => U
): TransformFunction<T, U> {
  function transformer(warpper: Warpper<T>): Warpper<U> {
    const context = getWrapperContext(warpper)
    // const userCtx = getContext(warpper)
    // console.log('userCtx', warpper, context, userCtx)

    const ctx: InternalCtx = {
      obj: warpper,
      result: null,
    }

    context?.[beforeTransformToken]?.forEach((fn) => fn(ctx))

    // 使用 bind 方法将 transformFn 绑定到 ctx 上
    // const boundTransformFn = transformFn.bind(ctx, obj.value, context)

    // const result = boundTransformFn()
    const result = transformFn(warpper.value)

    ctx.result = result

    context?.[afterTransformToken]?.forEach((fn) => fn(ctx))

    const ret = warpper as unknown as Warpper<U>
    ret.value = result
    return ret
  }

  return transformer
}

export function __create_transform_pass_warper<T, U>(
  transformFn: (obj: T, warpper: Warpper<T>) => U
): TransformFunction<T, U> {
  function transformer(warpper: Warpper<T>): Warpper<U> {
    const context = getWrapperContext(warpper)
    // const userCtx = getContext(warpper)
    // console.log('userCtx', warpper, context, userCtx)

    const ctx: InternalCtx = {
      obj: warpper,
      result: null,
    }

    context?.[beforeTransformToken]?.forEach((fn) => fn(ctx))

    // 使用 bind 方法将 transformFn 绑定到 ctx 上
    // const boundTransformFn = transformFn.bind(ctx, obj.value, context)

    // const result = boundTransformFn()
    const result = transformFn(warpper.value, warpper)

    ctx.result = result

    context?.[afterTransformToken]?.forEach((fn) => fn(ctx))

    const ret = warpper as unknown as Warpper<U>
    ret.value = result
    return ret
  }

  return transformer
}

// function transferCtx(from, to) {
//   if (!from || !to || from === to) {
//     return
//   }

//   if (from[contextSymbol]) {
//     to[contextSymbol] = from[contextSymbol]
//   }

//   if (from[userContextSymbol]) {
//     to[userContextSymbol] = from[userContextSymbol]
//   }
// }

export { dropContext, setContext, withContext } from './misc/context'
export { default as values } from './object/values'
export { default as pick } from './object/pick'
export { default as apply } from './misc/apply'
export { default as default } from './object/default'
export { default as filter } from './object/filter'
export { default as omit } from './object/omit'
export { default as rename } from './object/rename'
export { default as reduce } from './array/reduce'
export { default as sort } from './array/sort'
export { default as sortBy } from './array/sortBy'
export { default as map } from './array/map'
export { default as groupBy } from './array/groupBy'
export { default as chunk } from './array/chunk'
export { default as find } from './array/find'
export { default as every } from './array/every'
export { default as some } from './array/some'
export { default as keys } from './object/keys'
export { default as join } from './array/join'
export { default as extract } from './object/extract'
export { default as objectify } from './array/objectify'
export { default as findAll } from './array/findAll'
export { default as group } from './array/group'
export { default as forValues } from './object/forValues'
export { default as toArray } from './array/toArray'
export { default as shuffle } from './array/shuffle'
export { default as unique } from './array/unique'
export { default as flatten } from './array/flatten'
export { default as trim } from './array/trim'
export { default as slice } from './array/slice'
export { default as toSet } from './set/toSet'
export { default as sortObjectKeys } from './object/sortKeys'
