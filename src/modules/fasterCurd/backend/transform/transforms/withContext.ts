const contextSymbol = Symbol('__context')

function withContext<T extends object>(obj: T, initialContext: any): T {
  const proxy = new Proxy(obj, {
    get(target, prop, receiver) {
      if (prop === contextSymbol) {
        return initialContext
      }

      return Reflect.get(target, prop, receiver)
    },
    // set(target, prop, value, receiver) {
    //   // Perform any additional checks or actions if needed
    //   return Reflect.set(target, prop, value, receiver);
    // },
    // Add other traps as needed
  })

  return proxy as T
}

export default withContext

export function getContext(obj: object): any {
  return (obj as any)[contextSymbol]
}
