import { TransformFunction } from '..'

import {
  getWrapperContext,
  beforeTransformToken,
  afterTransformToken,
  getContext,
  contextSymbol,
  userContextSymbol,
} from './withContext'

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

function transferCtx(from, to) {
  if (!from || !to || from === to) {
    return
  }

  if (from[contextSymbol]) {
    to[contextSymbol] = from[contextSymbol]
  }

  if (from[userContextSymbol]) {
    to[userContextSymbol] = from[userContextSymbol]
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
export { dropContext, setContext, withContext} from './withContext'
export { default as join } from './join'
export { default as extract } from './extract'
export { default as objectify } from './objectify'
export { default as findAll } from './findAll'
export { default as group } from './group'
export { default as forallValues } from './forallValues'
