export type TransformFunction<T, U> = (data: T) => U;

class Trans<Target> {
  transform<A>(op1: TransformFunction<Target, A>): (data: Target) => A;
  // transform<A, B, C>(op1: TransformFunction<A, B>, op2: TransformFunction<B, C>): <D>(data: D) => C;
  // transform<A, B, C, D>(op1: TransformFunction<A, B>, op2: TransformFunction<B, C>, op3: TransformFunction<C, D>): <E>(data: E) => D;
  // transform<A, B, C, D, E>(op1: TransformFunction<A, B>, op2: TransformFunction<B, C>, op3: TransformFunction<C, D>, op4: TransformFunction<D, E>): <F>(data: F) => E;
  // transform<A, B, C, D, E, F>(op1: TransformFunction<A, B>, op2: TransformFunction<B, C>, op3: TransformFunction<C, D>, op4: TransformFunction<D, E>, op5: TransformFunction<E, F>): <G>(data: G) => F;
  // transform<A, B, C, D, E, F, G>(op1: TransformFunction<A, B>, op2: TransformFunction<B, C>, op3: TransformFunction<C, D>, op4: TransformFunction<D, E>, op5: TransformFunction<E, F>, op6: TransformFunction<F, G>): <H>(data: H) => G;
  // transform<A, B, C, D, E, F, G, H>(op1: TransformFunction<A, B>, op2: TransformFunction<B, C>, op3: TransformFunction<C, D>, op4: TransformFunction<D, E>, op5: TransformFunction<E, F>, op6: TransformFunction<F, G>, op7: TransformFunction<G, H>): <I>(data: I) => H;
  // transform<A, B, C, D, E, F, G, H, I>(op1: TransformFunction<A, B>, op2: TransformFunction<B, C>, op3: TransformFunction<C, D>, op4: TransformFunction<D, E>, op5: TransformFunction<E, F>, op6: TransformFunction<F, G>, op7: TransformFunction<G, H>, op8: TransformFunction<H, I>): <J>(data: J) => I;
  // transform<A, B, C, D, E, F, G, H, I, J>(op1: TransformFunction<A, B>, op2: TransformFunction<B, C>, op3: TransformFunction<C, D>, op4: TransformFunction<D, E>, op5: TransformFunction<E, F>, op6: TransformFunction<F, G>, op7: TransformFunction<G, H>, op8: TransformFunction<H, I>, op9: TransformFunction<I, J>): <K>(data: K) => J;
  // transform<A, B, C, D, E, F, G, H, I, J>(op1: TransformFunction<A, B>, op2: TransformFunction<B, C>, op3: TransformFunction<C, D>, op4: TransformFunction<D, E>, op5: TransformFunction<E, F>, op6: TransformFunction<F, G>, op7: TransformFunction<G, H>, op8: TransformFunction<H, I>, op9: TransformFunction<I, J>, ...rest: TransformFunction<any, any>[]): <K>(data: K) => any;
  transform(...ops: TransformFunction<any, any>[]) {
    return <I>(data: I) => ops.reduce((acc, op) => op(acc), data);
  }
}

import pick from './transforms/pick';
import omit from './transforms/omit';

const obj = {
  a: 1,
  b: 2,
  c: 3,
  d: 4,
}
const trans = new Trans<typeof obj>()
trans.transform(pick('a', 'b', 'c'))(obj)