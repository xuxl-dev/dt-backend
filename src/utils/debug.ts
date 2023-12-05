let debug = true

export function setDebug(value: boolean) {
  debug = value
}

export function log(...args: any[]) {
  if (debug) {
    console.log(...args)
  }
}