import { TransformFunction } from './builder'

export { TransformFunction }

// const obj = {
//   a: 'we',
//   b: 'love',
//   jvav: 'what',
//   d: 'javascript',
//   e: 'faster-crud',
// }

// const transformsOf = getBuilder(obj)

// const transform = transformsOf(
//   setContext({ foo: 'typescript', bar: 'context is avaliable' }),
//   rename({ a: 'aa' }),
//   pick('aa', 'b', 'd'),
//   withContext((ctx) => apply((o) => (o.d = ctx.foo))),
//   values(),
//   map((s) => s.toUpperCase()),
//   join(' '),
//   Do((s) => s.length),
//   withContext((ctx) =>
//     Do((o) => `${ctx.bar} is avaliable even if ${o} is ${typeof o}`)
//   )
// )

// console.log(`returns:`)
// console.log(transform(obj))
