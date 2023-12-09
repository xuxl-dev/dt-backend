import {
  InternalCtx,
  Warpper,
  __create_transform_pass_warper,
  createTransform,
} from '..'
import { TransformFunction } from '../..'

export const contextSymbol = Symbol('__context')
export const userContextSymbol = Symbol('__usercontext')
export const beforeTransformToken = 'beforeTransform'
export const afterTransformToken = 'afterTransform'

function setContext<T extends object>(
  initialContext: any
): TransformFunction<T, T> {
  return __create_transform_pass_warper((obj: T, warpper) => {
    // const proxy = new Proxy(obj, {
    //   get(target, prop, receiver) {
    //     if (prop === userContextSymbol) {
    //       return initialContext
    //     }

    //     if (prop === contextSymbol) {
    //       return internalContext
    //     }

    //     return Reflect.get(target, prop, receiver)
    //   }
    // })

    initContext(warpper)
    warpper[userContextSymbol] = initialContext
    return obj as T
  })
}

function dropContext<T extends object>(): TransformFunction<T, T> {
  return createTransform((obj: T) => {
    Reflect.deleteProperty(obj, contextSymbol)
    Reflect.deleteProperty(obj, userContextSymbol)

    return obj as T
  })
}

function withContext<T, A>(
  transform: (ctx) => TransformFunction<T, A>
): TransformFunction<T, A> {
  function transformer(warpper: Warpper<T>): Warpper<A> {
    const context = getContext(warpper)

    const ret = transform(context)(warpper)

    return ret
  }

  return transformer
}

function initContext(obj) {
  if (!obj[contextSymbol]) {
    // obj[contextSymbol] = {}
    Object.defineProperty(obj, contextSymbol, {
      value: {},
      enumerable: false,
      writable: true,
    })
  }

  if (!obj[userContextSymbol]) {
    // obj[userContextSymbol] = {}
    Object.defineProperty(obj, userContextSymbol, {
      value: {},
      enumerable: false,
      writable: true,
    })
  }
}

export { setContext, dropContext, withContext }

export function getWrapperContext(obj: any): any {
  return (obj as any)[contextSymbol]
}

export function getContext(obj: any): any {
  return (obj as any)[userContextSymbol]
}
