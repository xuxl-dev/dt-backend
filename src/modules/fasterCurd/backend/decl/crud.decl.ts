export type Page = {
  /**
   * 当前页
   */
  currentPage?: number
  /**
   * 每页条数
   */
  pageSize?: number
}
/**
 * 查询排序参数
 */
export type PageSort = {
  prop?: string
  order?: string
  asc?: boolean
}
/**
 * 查询
 */
export type PageQuery = {
  /**
   * 翻页参数
   */
  page?: Page
  /**
   * 查询表单
   */
  form?: any
  /**
   * 远程排序配置
   */
  sort?: PageSort
}
/**
 * fs-crud能够接受的页面数据格式，
 * 如果你的后台与此格式不一致，你需要转化成此格式，
 * 请参考transformRes
 */
export type PageRes = {
  /**
   * 当前页
   */
  currentPage: number
  /**
   * 每页条数
   */
  pageSize: number
  /**
   * 总记录数
   */
  total: number
  /**
   * 列表数据
   */
  records: Array<object>
}
export type EditReq = {
  form?: any
  row?: any
  [key: string]: any
}
export type AddReq = {
  form?: any
  [key: string]: any
}
export type DelReq = {
  row?: any
  [key: string]: any
}
export type InfoReq = {
  mode?: string
  row?: any
  [key: string]: any
}
/**
 * 用户后台page请求原始返回
 */
export type UserPageRes = {
  [key: string]: any
}
/**
 * 用户自定义的后台翻页参数
 */
export type UserPageQuery = {
  [key: string]: any
}

export type CreateRet = Promise<any>
export type ReadRet = Promise<PageRes>
export type UpdateRet = Promise<any>
export type DeleteRet = Promise<any>

export type Create = (data: AddReq) => CreateRet
export type Read = (query: PageQuery) => ReadRet
export type Update = (data: EditReq) => UpdateRet
export type Delete = (data: DelReq) => DeleteRet
