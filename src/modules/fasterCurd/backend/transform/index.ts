import { getBuilder, TransformFunction } from './builder'
import {
  pick,
  values,
  getContext,
  apply,
  dropContext,
  withContext,
  omit,
  rename,
  map,
  reduce,
  join,
} from './transforms'
export { TransformFunction }

const obj = {
  a: 'we',
  b: 'love',
  jvav: 'java',
  d: 'javascript',
  e: 'faster-crud',
}
const transformsOf = getBuilder(obj)

const transform = transformsOf(
  withContext({ foo: 'typescript' }),
  rename({ jvav: 'shit' }),
  omit('shit'),
  pick('a', 'b', 'd'),
  apply((obj) => {
    const context = getContext(obj)
    obj.d = context.foo
    return obj
  }),
  dropContext(),
  values(),
  map((s) => s.toUpperCase()),
  join(' ')
)
console.log(`returns:`)
console.log(transform(obj))
