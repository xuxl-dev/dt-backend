export type Only<T, K extends keyof T> = {
  [P in keyof T]: P extends K ? T[P] : never
}

export type OnlyOneOf<T> = {
  [P in keyof T]: T[P] extends any[] ? T[P] : never
}[keyof T]

/**
 *
 */
// export type ExtendsOnly<T, U> = {
//   [K in keyof T]: K extends keyof U ? T[K] : never;
// };

export type ExtendsOnly<T, U> = ExcludeNever<{
  [K in keyof T | keyof U]: K extends keyof T
    ? K extends keyof U
      ? T[K]
      : never
    : K extends keyof U
    ? U[K] | undefined
    : never
}>

type ExcludeNever<T> = {
  [K in keyof T as T[K] extends never ? never : K]: T[K]
}

/**
 * Intersection of T and U, preserve value of T
 */
export type Intersection<T, U> = {
  [K in Extract<keyof T, keyof U>]: T[K]
}

export type Prettify<T> = {
  [K in keyof T]: T[K];
} & {};

export type Prettify2<T> = {
  // [K in keyof T]: T[K];
  [K in keyof T]: T[K] extends object ? Prettify2<T[K]> : T[K];
  // eslint-disable-next-line @typescript-eslint/no-redundant-type-constituents
} & unknown;