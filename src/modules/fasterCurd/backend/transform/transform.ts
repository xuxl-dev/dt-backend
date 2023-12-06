type TransformFunction<T, U> = (data: T) => U;

function transform<A, B>(op1: TransformFunction<A, B>):  <C>(data: C) => B;
function transform<A, B, C>(op1: TransformFunction<A, B>, op2: TransformFunction<B, C>): <D>(data: D) => C;
function transform<A, B, C, D>(op1: TransformFunction<A, B>, op2: TransformFunction<B, C>, op3: TransformFunction<C, D>): <E>(data: E) => D;
function transform<A, B, C, D, E>(op1: TransformFunction<A, B>, op2: TransformFunction<B, C>, op3: TransformFunction<C, D>, op4: TransformFunction<D, E>): <F>(data: F) => E;
function transform<A, B, C, D, E, F>(op1: TransformFunction<A, B>, op2: TransformFunction<B, C>, op3: TransformFunction<C, D>, op4: TransformFunction<D, E>, op5: TransformFunction<E, F>): <G>(data: G) => F;
function transform<A, B, C, D, E, F, G>(op1: TransformFunction<A, B>, op2: TransformFunction<B, C>, op3: TransformFunction<C, D>, op4: TransformFunction<D, E>, op5: TransformFunction<E, F>, op6: TransformFunction<F, G>): <H>(data: H) => G;
function transform<A, B, C, D, E, F, G, H>(op1: TransformFunction<A, B>, op2: TransformFunction<B, C>, op3: TransformFunction<C, D>, op4: TransformFunction<D, E>, op5: TransformFunction<E, F>, op6: TransformFunction<F, G>, op7: TransformFunction<G, H>): <I>(data: I) => H;
function transform<A, B, C, D, E, F, G, H, I>(op1: TransformFunction<A, B>, op2: TransformFunction<B, C>, op3: TransformFunction<C, D>, op4: TransformFunction<D, E>, op5: TransformFunction<E, F>, op6: TransformFunction<F, G>, op7: TransformFunction<G, H>, op8: TransformFunction<H, I>): <J>(data: J) => I;
function transform<A, B, C, D, E, F, G, H, I, J>(op1: TransformFunction<A, B>, op2: TransformFunction<B, C>, op3: TransformFunction<C, D>, op4: TransformFunction<D, E>, op5: TransformFunction<E, F>, op6: TransformFunction<F, G>, op7: TransformFunction<G, H>, op8: TransformFunction<H, I>, op9: TransformFunction<I, J>): <K>(data: K) => J;
function transform(...ops: TransformFunction<any, any>[]) {
  return <I>(data: I) => ops.reduce((acc, op) => op(acc), data);
}
// example
const pickAB: TransformFunction<{ a: number; b: number }, { a: number }> = (data) => ({ a: data.a });
const doubleA: TransformFunction<{ a: number }, { a: number }> = (data) => ({ a: data.a * 2 });
const stringifyA: TransformFunction<{ a: number }, { a: string }> = (data) => ({ a: data.a.toString() });

const data = { a: 5, b: 10 };
const result = transform(pickAB, doubleA, stringifyA)(data);
console.log(result); 