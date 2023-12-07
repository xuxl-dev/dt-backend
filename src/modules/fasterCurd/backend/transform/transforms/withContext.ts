import { InternalCtx } from '.'
import { TransformFunction } from '..'

const contextSymbol = Symbol('__context')
const userContextSymbol = Symbol('__usercontext')
export const beforeTransformToken = 'beforeTransform'
export const afterTransformToken = 'afterTransform'

function withContext<T extends object>(
  initialContext: any
): TransformFunction<T, T> {
  const internalContext = {}
  return function mapperFunction(obj: T): T {
    const proxy = new Proxy(obj, {
      get(target, prop, receiver) {
        if (prop === userContextSymbol) {
          return initialContext
        }

        if (prop === contextSymbol) {
          return internalContext
        }

        return Reflect.get(target, prop, receiver)
      },
    })

    initContext(proxy)

    return proxy as T
  }
}
/**
 * override the context
 * @param source
 * @param destination
 * @returns
 */
function transferContext<T>(ctx: InternalCtx): T {
  // if destination is primitive, do nothing
  const { obj: source, result: destination } = ctx
  if (typeof destination !== 'object') {
    console.warn('transferContext: destination is not an object, stop transfer') 
    //TODO is this a better way to handle this?
    // such as warp the values in an object?
    return destination
  }

  if (source[contextSymbol]) {
    destination[contextSymbol] = source[contextSymbol]
  }

  if (source[userContextSymbol]) {
    destination[userContextSymbol] = source[userContextSymbol]
  }

  // console.log('transferContext', source, destination)

  return destination
}

function initContext(obj) {
  if (!obj[contextSymbol]) {
    obj[contextSymbol] = {}
  }

  obj[contextSymbol][afterTransformToken] = [transferContext]
  // console.log('initContext', obj)
}

export default withContext

export function getContext(obj: any): any {
  return (obj as any)[userContextSymbol]
}

export function getInternalContext(obj: any): any {
  return (obj as any)[contextSymbol]
}
