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
  setContext({ foo: 'typescript' }), // context is passed to all transforms
  withContext((ctx) => {
    console.log(`context is:`, ctx)
    return rename({ a: 'aa' })
  }),

  rename({ jvav: 'hmm' }), // we don't like this language!
  omit('hmm'), // ignore it!
  pick('aa', 'b', 'd'), // pick what we need: "we" "love" "javascript"
  // replace javascript with our favourite language
  withContext((ctx) => applyInplcae((o) => (o.d = ctx.foo))),
  // drop context, since we dont need it. It's okay not to drop it
  dropContext(),
  values(), // convert the object to its values array
  map((s) => s.toUpperCase()), // make every of them captialized
  join(' ') // join them by space
)
console.log(`returns:`)
console.log(transform(obj))
