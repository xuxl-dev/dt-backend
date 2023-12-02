export type HttpMethods = `get` | `post` | `put` | `delete` | `patch`
export type CRUDMethod = `create` | `read` | `update` | `delete`
export const defaultCrudMethod: CRUDMethod[] = [
  `create`,
  `read`,
  `update`,
  `delete`,
]
