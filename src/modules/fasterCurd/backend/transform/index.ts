import { getBuilder, TransformFunction } from './builder'
import { map, pick, values, withContext, getContext, apply } from './transforms'

const obj = {
  a: 1,
  b: 2,
  c: 3,
  d: 4,
}
const trans = getBuilder(obj)

const transform = trans(
  withContext({}),
  pick('a', 'b', 'c'),
  pick('a', 'b'),
  values(),
  apply((obj) => console.log(obj))
)

console.log(`returning`, transform(obj))

export { TransformFunction }
