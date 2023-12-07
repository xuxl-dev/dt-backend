
import { getBuilder, TransformFunction } from './builder'
import { map, pick, values } from './transforms'

const obj = {
  a: 1,
  b: 2,
  c: 3,
  d: 4,
}
const trans = getBuilder(obj)

const transform = trans(
  pick('a', 'b', 'c'),
  pick('a', 'b'),
  map((obj) => obj.a + obj.b * 2),
  map((v) => v * 2),
)

console.log(transform(obj))

export { TransformFunction }
