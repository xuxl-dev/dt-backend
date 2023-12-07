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
  applyInplcae,
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
  withContext({ foo: 'typescript' }), // context is passed to all transforms
  rename({ jvav: 'shit' }), // we don't like this language!
  omit('shit'), // ignore it!
  pick('a', 'b', 'd'), // pick what we need: "we" "love" "javascript"
  // replace javascript with our favourite language
  applyInplcae((o) => (o.d = getContext(o).foo)), 
  // drop context, since we dont need it. It's okay not to drop it
  dropContext(), 
  values(), // convert the object to its values array
  map((s) => s.toUpperCase()), // make every of them captialized
  join(' ') // join them by space
)
console.log(`returns:`)
console.log(transform(obj))
