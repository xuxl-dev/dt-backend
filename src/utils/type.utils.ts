export type Only<T, K extends keyof T> = {
  [P in keyof T]: P extends K ? T[P] : never
}

export type OnlyOneOf<T> = {
  [P in keyof T]: T[P] extends any[] ? T[P] : never
}[keyof T]