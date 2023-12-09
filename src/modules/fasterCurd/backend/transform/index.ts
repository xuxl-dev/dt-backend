import { getBuilder, TransformFunction } from './builder'
import {
  pick,
  values,
  apply,
  dropContext,
  withContext,
  omit,
  rename,
  map,
  reduce,
  join,
  applyInplcae,
} from './transforms'
import Do from './transforms/do'
import { setContext } from './transforms/withContext'
export { TransformFunction }

const obj = {
  a: 'we',
  b: 'love',
  jvav: 'what',
  d: 'javascript',
  e: 'faster-crud',
}
const transformsOf = getBuilder(obj)

const transform = transformsOf(
  setContext({ foo: 'typescript', bar: 'context is avaliable' }),
  withContext(() => rename({ a: 'aa' })),
  pick('aa', 'b', 'd'),
  withContext((ctx) => applyInplcae((o) => (o.d = ctx.foo))),
  values(),
  map((s) => s.toUpperCase()),
  join(' '),
  Do((s) => s.length),
  withContext((ctx) =>
    Do((o) => `${ctx.bar} is avaliable even if ${o} is ${typeof o}`)
  )
)

console.log(`returns:`)
console.log(transform(obj))
