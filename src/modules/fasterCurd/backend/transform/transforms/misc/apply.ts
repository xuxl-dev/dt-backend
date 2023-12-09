import {  createTransform } from '..'
import { TransformFunction } from '../..'

function apply<T, U>(
  applier: (obj: T) => U
): TransformFunction<T, U> {
  return createTransform((obj: T) => {
    return applier(obj)
  })
}

/**
 * Modify the object in place.
 *
 * You must not change the reference of the object.
 *
 * Only modify values is permitted.
 *
 * do not modify fields, and changes in types will not be tracked.
 *
 * @param applier
 * @returns
 */
export function applyInplcae<T>(
  applier: (obj: T) => void
): TransformFunction<T, T> {
  return createTransform((obj: T) => {
    applier(obj)
    return obj
  })
}

export default apply
