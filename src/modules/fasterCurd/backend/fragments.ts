import { ConfigCtx } from '../fc.decorators'
import validatorMap from './validators'
import { PageQuery } from '../crud-gen/fast-crud.decl'
import { CRUDMethod } from './decl/base.decl'
import { isEmptyObject } from 'src/utils/utils'
import { isCallable } from 'src/utils/objectTools'

export const IGNORE_ME = Symbol('ignore me')
export type PendingCheckerType = ((data: any) => void) | typeof IGNORE_ME
export type CheckerType = (data: any) => void
export type PendingTransformerType = ((data: any) => any) | typeof IGNORE_ME
export type TransformerType = (data: any) => any

const form_requests: string[] = ['create', 'update', 'delete']
const query_requests: string[] = ['read']

function shape_checker({ option: option, action: action }: ConfigCtx) {
  const { rawInput } = option
  let check_shape: PendingCheckerType = IGNORE_ME
  if (!rawInput && form_requests.includes(action)) {
    check_shape = (data: any) => {
      if (!(data.hasOwnProperty('form') || data.hasOwnProperty('row'))) {
        throw new Error(`form/row not found, wrong input format`)
      }
    }
  }
  return check_shape
}

function pagination_checker({ option }: ConfigCtx) {
  let check_pagination: PendingCheckerType = IGNORE_ME
  if (option.method !== 'read') {
    return check_pagination
  }
  const { pagination, rawInput } = option
  if (pagination && !rawInput) {
    check_pagination = ({ page }: PageQuery) => {
      // check if pagination is exist
      if (!page) {
        throw new Error(`pagination not found for paginated query`)
      }

      // check if pagination is valid
      const { currentPage, pageSize } = page // currentPage is not checked here
      if (
        !currentPage ||
        !pageSize ||
        Number.isNaN(pageSize) ||
        Number.isNaN(currentPage) ||
        currentPage < 0 ||
        pageSize <= 0
      ) {
        throw new Error(`invalid pagination`)
      }

      const [min, max] = [
        pagination.min ?? 0,
        pagination.max, //this must be defined
      ]
      if (pageSize < min || pageSize > max) {
        throw new Error(`pageSize out of range`)
      }
    }
  }
  return check_pagination
}

function sort_checker({ option }: ConfigCtx) {
  let check_sort: PendingCheckerType = IGNORE_ME
  if (option.method !== 'read') {
    return check_sort
  }
  const { sort: default_sort, rawInput } = option
  if (default_sort && !rawInput) {
    check_sort = (query: PageQuery) => {
      const { sort } = query
      if (!sort || isEmptyObject(sort)) {
        query.sort = default_sort
      }
    }
  }
  return check_sort
}

function expect_checker({ option }: ConfigCtx) {
  //TODO sync this with requrie_checker
  const { expect } = option
  let check_expect: PendingCheckerType = IGNORE_ME
  if (!expect) {
    return check_expect
  }
  if (Array.isArray(expect) && expect.length > 0) {
    check_expect = ({ form }: any) => {
      for (const pred of expect) {
        if (!pred(form)) {
          throw new Error(`expect assert failed`)
        }
      }
    }
  } else if (!Array.isArray(expect) && isCallable(expect)) {
    check_expect = ({ form }: any) => {
      if (!expect(form)) {
        throw new Error(`expect assert failed`)
      }
    }
  } else {
    throw new Error('Unsupported assert')
  }
  return check_expect
}

function requrie_checker({ option, fields }: ConfigCtx) {
  const { require: requires, deny: denies } = option
  let check_requirements: PendingCheckerType = IGNORE_ME
  if (requires && Array.isArray(requires) && requires.length > 0) {
    check_requirements = ({ form }: any) => {
      for (const field of requires) {
        if (!form.hasOwnProperty(field)) {
          throw new Error(`Missing field ${String(field)} in form`)
        }
      }
    }
  } else if (requires instanceof RegExp) {
    check_requirements = ({ form }: any) => {
      for (const [name, field] of Object.entries(fields)) {
        console.log(name, field)
        if (
          requires.test(name) &&
          !form.hasOwnProperty(name) &&
          field.requires_override !== false // note that unset (undefined) is true
        ) {
          throw new Error(`Missing field ${String(name)} form`)
        }
      }
    }
  }
  return check_requirements
}

function deny_checker({ option }: ConfigCtx) {
  //TODO sync this with requrie_checker
  const { deny: denies } = option
  let check_requirements: PendingCheckerType = IGNORE_ME
  if (denies && Array.isArray(denies) && denies.length > 0) {
    check_requirements = ({ form }: any) => {
      for (const field of denies) {
        if (form.hasOwnProperty(field)) {
          throw new Error(`Unexpected field ${String(field)}`)
        }
      }
    }
  } else if (denies instanceof RegExp) {
    check_requirements = ({ form }: any) => {
      for (const field in form) {
        if (denies.test(field)) {
          throw new Error(`Unexpected field ${String(field)}`)
        }
      }
    }
  }

  return check_requirements
}

function exactly_checker({ option }: ConfigCtx) {
  const { exactly } = option
  let check_requirements: PendingCheckerType = IGNORE_ME
  if (exactly && Array.isArray(exactly) && exactly.length > 0) {
    check_requirements = ({ form }: any) => {
      for (const field of exactly) {
        if (!form.hasOwnProperty(field)) {
          throw new Error(`Missing field ${String(field)} form`)
        }
      }
      for (const field in form) {
        if (!exactly.includes(field)) {
          throw new Error(`Unexpected field ${String(field)}`)
        }
      }
    }
  }
  return check_requirements
}

function type_checker({ option, fields }: ConfigCtx) {
  const { checkType } = option
  let check_requirements: PendingCheckerType = IGNORE_ME
  if (checkType) {
    check_requirements = ({ form }: any) => {
      for (const [key, f] of Object.entries(fields)) {
        const val = form[key]
        const validator: ((x: any) => boolean) | null =
          f.validator || validatorMap[f.type]
        if (!f.noCheck && validator) {
          if (validator(val)) {
            // all good
          } else {
            throw new Error(`assertion failed for asserted key ${key}`)
          }
        } else {
          if (!f.noCheck) {
            throw new Error(
              `missing validator for checked type ${f.type} (named ${key})`
            )
          }
        }
      }
    }
  }
  return check_requirements
}

function return_transformer({ option }: ConfigCtx) {
  let transform_query_return: PendingTransformerType = IGNORE_ME

  // if (option.method !== 'read') {
  //   return transform_query_return
  // }
  const { transformQueryRet, TransformQueryRetInplace } = option
  if (transformQueryRet) {
    //TODO add check for function
    transform_query_return = transformQueryRet
  }

  if (TransformQueryRetInplace) {
    transform_query_return = (x) => {
      TransformQueryRetInplace(x)
      return x
    }
  }

  //TODO extract this!
  if (option.method === 'read') {
    const { TransformRecordInplace, transformQueryRet } = option
    if (TransformRecordInplace) {
      transform_query_return = (x) => {
        x.records.forEach(TransformRecordInplace)
        return x
      }
    }

    if (transformQueryRet) {
      transform_query_return = (x) => {
        x.records = transformQueryRet(x.records) // the ret is a paged query, unwrap it
        return x.records
      }
    }
  }

  return transform_query_return
}

function pre_transformer({ option }: ConfigCtx) {
  const { transform } = option
  let transform_data: PendingTransformerType = IGNORE_ME
  if (transform) {
    //TODO add check for function
    transform_data = transform
  }
  return transform_data
}

// this is a special one
function after_transformer({ option }: ConfigCtx) {
  const { transformAfter, method } = option
  if (transformAfter) {
    // user's override, use it
    return transformAfter
  }
  let transform_after = (data: any, queryRet: any) => data

  if (form_requests.includes(method)) {
    // if Create, Update, Delete, then return form
    transform_after = (data: any, queryRet: any) => {
      return data.form
    }
  }
  if (query_requests.includes(method)) {
    // if Read, then return records
    transform_after = (data: any, queryRet: any) => {
      return queryRet
    }
  }

  return transform_after
}

export const checker_factories = [
  shape_checker,
  sort_checker,
  requrie_checker,
  deny_checker,
  expect_checker,
  exactly_checker,
  pagination_checker,
  type_checker,
]

export const pre_transformer_factories = [
  pre_transformer,
  // pagination_transformer,
]

export const post_transformer_factories = [return_transformer]

export { after_transformer }
