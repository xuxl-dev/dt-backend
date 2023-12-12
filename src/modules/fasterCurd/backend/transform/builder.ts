import { Warpper, getTransformName } from './transforms'

export interface TransformFunction<T, R> {
  (source: Warpper<T>): Warpper<R>
}

export function isTransformFunction<T, A>(
  transform: any
): transform is TransformFunction<T, A> {
  return (
    typeof transform === 'function' &&
    'prototype' in transform &&
    'source' in transform('' as any)
  )
}

class TransformBuilder<Target = any> {
  transform<A>(op1: TransformFunction<Target, A>): (data: Target) => A
  transform<A, B>(
    op1: TransformFunction<Target, A>,
    op2: TransformFunction<A, B>
  ): (data: Target) => B
  transform<A, B, C>(
    op1: TransformFunction<Target, A>,
    op2: TransformFunction<A, B>,
    op3: TransformFunction<B, C>
  ): (data: Target) => C
  transform<A, B, C, D>(
    op1: TransformFunction<Target, A>,
    op2: TransformFunction<A, B>,
    op3: TransformFunction<B, C>,
    op4: TransformFunction<C, D>
  ): (data: Target) => D
  transform<A, B, C, D, E>(
    op1: TransformFunction<Target, A>,
    op2: TransformFunction<A, B>,
    op3: TransformFunction<B, C>,
    op4: TransformFunction<C, D>,
    op5: TransformFunction<D, E>
  ): (data: Target) => E
  transform<A, B, C, D, E, F>(
    op1: TransformFunction<Target, A>,
    op2: TransformFunction<A, B>,
    op3: TransformFunction<B, C>,
    op4: TransformFunction<C, D>,
    op5: TransformFunction<D, E>,
    op6: TransformFunction<E, F>
  ): (data: Target) => F
  transform<A, B, C, D, E, F, G>(
    op1: TransformFunction<Target, A>,
    op2: TransformFunction<A, B>,
    op3: TransformFunction<B, C>,
    op4: TransformFunction<C, D>,
    op5: TransformFunction<D, E>,
    op6: TransformFunction<E, F>,
    op7: TransformFunction<F, G>
  ): (data: Target) => G
  transform<A, B, C, D, E, F, G, H>(
    op1: TransformFunction<Target, A>,
    op2: TransformFunction<A, B>,
    op3: TransformFunction<B, C>,
    op4: TransformFunction<C, D>,
    op5: TransformFunction<D, E>,
    op6: TransformFunction<E, F>,
    op7: TransformFunction<F, G>,
    op8: TransformFunction<G, H>
  ): (data: Target) => H
  transform<A, B, C, D, E, F, G, H, I>(
    op1: TransformFunction<Target, A>,
    op2: TransformFunction<A, B>,
    op3: TransformFunction<B, C>,
    op4: TransformFunction<C, D>,
    op5: TransformFunction<D, E>,
    op6: TransformFunction<E, F>,
    op7: TransformFunction<F, G>,
    op8: TransformFunction<G, H>,
    op9: TransformFunction<H, I>
  ): (data: Target) => I
  transform<A, B, C, D, E, F, G, H, I, J>(
    op1: TransformFunction<Target, A>,
    op2: TransformFunction<A, B>,
    op3: TransformFunction<B, C>,
    op4: TransformFunction<C, D>,
    op5: TransformFunction<D, E>,
    op6: TransformFunction<E, F>,
    op7: TransformFunction<F, G>,
    op8: TransformFunction<G, H>,
    op9: TransformFunction<H, I>,
    op10: TransformFunction<I, J>
  ): (data: Target) => J
  transform<A, B, C, D, E, F, G, H, I, J, K>(
    op1: TransformFunction<Target, A>,
    op2: TransformFunction<A, B>,
    op3: TransformFunction<B, C>,
    op4: TransformFunction<C, D>,
    op5: TransformFunction<D, E>,
    op6: TransformFunction<E, F>,
    op7: TransformFunction<F, G>,
    op8: TransformFunction<G, H>,
    op9: TransformFunction<H, I>,
    op10: TransformFunction<I, J>,
    op11: TransformFunction<J, K>
  ): (data: Target) => K
  transform<A, B, C, D, E, F, G, H, I, J, K, L>(
    op1: TransformFunction<Target, A>,
    op2: TransformFunction<A, B>,
    op3: TransformFunction<B, C>,
    op4: TransformFunction<C, D>,
    op5: TransformFunction<D, E>,
    op6: TransformFunction<E, F>,
    op7: TransformFunction<F, G>,
    op8: TransformFunction<G, H>,
    op9: TransformFunction<H, I>,
    op10: TransformFunction<I, J>,
    op11: TransformFunction<J, K>,
    op12: TransformFunction<K, L>
  ): (data: Target) => L
  transform<A, B, C, D, E, F, G, H, I, J, K, L, M>(
    op1: TransformFunction<Target, A>,
    op2: TransformFunction<A, B>,
    op3: TransformFunction<B, C>,
    op4: TransformFunction<C, D>,
    op5: TransformFunction<D, E>,
    op6: TransformFunction<E, F>,
    op7: TransformFunction<F, G>,
    op8: TransformFunction<G, H>,
    op9: TransformFunction<H, I>,
    op10: TransformFunction<I, J>,
    op11: TransformFunction<J, K>,
    op12: TransformFunction<K, L>,
    op13: TransformFunction<L, M>
  ): (data: Target) => M
  transform<A, B, C, D, E, F, G, H, I, J, K, L, M, N>(
    op1: TransformFunction<Target, A>,
    op2: TransformFunction<A, B>,
    op3: TransformFunction<B, C>,
    op4: TransformFunction<C, D>,
    op5: TransformFunction<D, E>,
    op6: TransformFunction<E, F>,
    op7: TransformFunction<F, G>,
    op8: TransformFunction<G, H>,
    op9: TransformFunction<H, I>,
    op10: TransformFunction<I, J>,
    op11: TransformFunction<J, K>,
    op12: TransformFunction<K, L>,
    op13: TransformFunction<L, M>,
    op14: TransformFunction<M, N>
  ): (data: Target) => N
  transform<A, B, C, D, E, F, G, H, I, J, K, L, M, N, O>(
    op1: TransformFunction<Target, A>,
    op2: TransformFunction<A, B>,
    op3: TransformFunction<B, C>,
    op4: TransformFunction<C, D>,
    op5: TransformFunction<D, E>,
    op6: TransformFunction<E, F>,
    op7: TransformFunction<F, G>,
    op8: TransformFunction<G, H>,
    op9: TransformFunction<H, I>,
    op10: TransformFunction<I, J>,
    op11: TransformFunction<J, K>,
    op12: TransformFunction<K, L>,
    op13: TransformFunction<L, M>,
    op14: TransformFunction<M, N>,
    op15: TransformFunction<N, O>
  ): (data: Target) => O
  transform<A, B, C, D, E, F, G, H, I, J, K, L, M, N, O, P>(
    op1: TransformFunction<Target, A>,
    op2: TransformFunction<A, B>,
    op3: TransformFunction<B, C>,
    op4: TransformFunction<C, D>,
    op5: TransformFunction<D, E>,
    op6: TransformFunction<E, F>,
    op7: TransformFunction<F, G>,
    op8: TransformFunction<G, H>,
    op9: TransformFunction<H, I>,
    op10: TransformFunction<I, J>,
    op11: TransformFunction<J, K>,
    op12: TransformFunction<K, L>,
    op13: TransformFunction<L, M>,
    op14: TransformFunction<M, N>,
    op15: TransformFunction<N, O>,
    op16: TransformFunction<O, P>
  ): (data: Target) => P
  transform<A, B, C, D, E, F, G, H, I, J, K, L, M, N, O, P, Q>(
    op1: TransformFunction<Target, A>,
    op2: TransformFunction<A, B>,
    op3: TransformFunction<B, C>,
    op4: TransformFunction<C, D>,
    op5: TransformFunction<D, E>,
    op6: TransformFunction<E, F>,
    op7: TransformFunction<F, G>,
    op8: TransformFunction<G, H>,
    op9: TransformFunction<H, I>,
    op10: TransformFunction<I, J>,
    op11: TransformFunction<J, K>,
    op12: TransformFunction<K, L>,
    op13: TransformFunction<L, M>,
    op14: TransformFunction<M, N>,
    op15: TransformFunction<N, O>,
    op16: TransformFunction<O, P>,
    op17: TransformFunction<P, Q>
  ): (data: Target) => Q
  transform<A, B, C, D, E, F, G, H, I, J, K, L, M, N, O, P, Q, R>(
    op1: TransformFunction<Target, A>,
    op2: TransformFunction<A, B>,
    op3: TransformFunction<B, C>,
    op4: TransformFunction<C, D>,
    op5: TransformFunction<D, E>,
    op6: TransformFunction<E, F>,
    op7: TransformFunction<F, G>,
    op8: TransformFunction<G, H>,
    op9: TransformFunction<H, I>,
    op10: TransformFunction<I, J>,
    op11: TransformFunction<J, K>,
    op12: TransformFunction<K, L>,
    op13: TransformFunction<L, M>,
    op14: TransformFunction<M, N>,
    op15: TransformFunction<N, O>,
    op16: TransformFunction<O, P>,
    op17: TransformFunction<P, Q>,
    op18: TransformFunction<Q, R>
  ): (data: Target) => R
  transform<A, B, C, D, E, F, G, H, I, J, K, L, M, N, O, P, Q, R, S>(
    op1: TransformFunction<Target, A>,
    op2: TransformFunction<A, B>,
    op3: TransformFunction<B, C>,
    op4: TransformFunction<C, D>,
    op5: TransformFunction<D, E>,
    op6: TransformFunction<E, F>,
    op7: TransformFunction<F, G>,
    op8: TransformFunction<G, H>,
    op9: TransformFunction<H, I>,
    op10: TransformFunction<I, J>,
    op11: TransformFunction<J, K>,
    op12: TransformFunction<K, L>,
    op13: TransformFunction<L, M>,
    op14: TransformFunction<M, N>,
    op15: TransformFunction<N, O>,
    op16: TransformFunction<O, P>,
    op17: TransformFunction<P, Q>,
    op18: TransformFunction<Q, R>,
    op19: TransformFunction<R, S>
  ): (data: Target) => S
  transform<A, B, C, D, E, F, G, H, I, J, K, L, M, N, O, P, Q, R, S, T>(
    op1: TransformFunction<Target, A>,
    op2: TransformFunction<A, B>,
    op3: TransformFunction<B, C>,
    op4: TransformFunction<C, D>,
    op5: TransformFunction<D, E>,
    op6: TransformFunction<E, F>,
    op7: TransformFunction<F, G>,
    op8: TransformFunction<G, H>,
    op9: TransformFunction<H, I>,
    op10: TransformFunction<I, J>,
    op11: TransformFunction<J, K>,
    op12: TransformFunction<K, L>,
    op13: TransformFunction<L, M>,
    op14: TransformFunction<M, N>,
    op15: TransformFunction<N, O>,
    op16: TransformFunction<O, P>,
    op17: TransformFunction<P, Q>,
    op18: TransformFunction<Q, R>,
    op19: TransformFunction<R, S>,
    op20: TransformFunction<S, T>
  ): (data: Target) => T
  transform<A, B, C, D, E, F, G, H, I, J, K, L, M, N, O, P, Q, R, S, T>(
    op1: TransformFunction<Target, A>,
    op2?: TransformFunction<A, B>,
    op3?: TransformFunction<B, C>,
    op4?: TransformFunction<C, D>,
    op5?: TransformFunction<D, E>,
    op6?: TransformFunction<E, F>,
    op7?: TransformFunction<F, G>,
    op8?: TransformFunction<G, H>,
    op9?: TransformFunction<H, I>,
    op10?: TransformFunction<I, J>,
    op11?: TransformFunction<J, K>,
    op12?: TransformFunction<K, L>,
    op13?: TransformFunction<L, M>,
    op14?: TransformFunction<M, N>,
    op15?: TransformFunction<N, O>,
    op16?: TransformFunction<O, P>,
    op17?: TransformFunction<P, Q>,
    op18?: TransformFunction<Q, R>,
    op19?: TransformFunction<R, S>,
    op20?: TransformFunction<S, T>
  ): (data: Target) => any
  transform<A, B, C, D, E, F, G, H, I, J, K, L, M, N, O, P, Q, R, S, T>(
    op1: TransformFunction<Target, A>,
    op2?: TransformFunction<A, B>,
    op3?: TransformFunction<B, C>,
    op4?: TransformFunction<C, D>,
    op5?: TransformFunction<D, E>,
    op6?: TransformFunction<E, F>,
    op7?: TransformFunction<F, G>,
    op8?: TransformFunction<G, H>,
    op9?: TransformFunction<H, I>,
    op10?: TransformFunction<I, J>,
    op11?: TransformFunction<J, K>,
    op12?: TransformFunction<K, L>,
    op13?: TransformFunction<L, M>,
    op14?: TransformFunction<M, N>,
    op15?: TransformFunction<N, O>,
    op16?: TransformFunction<O, P>,
    op17?: TransformFunction<P, Q>,
    op18?: TransformFunction<Q, R>,
    op19?: TransformFunction<R, S>,
    op20?: TransformFunction<S, T>,
    ...rest: TransformFunction<any, any>[]
  ): (data: Target) => any

  transform(...ops: TransformFunction<any, any>[]) {
    // return <I>(data: I) => ops.reduce((acc, op) => op(acc), { value: data }).value // always unwrap the value
    return <I>(data: I) => {
      let result = {
        value: data,
      } as any
      for (const op of ops) {
        try {
          result = op(result)
        } catch (e) {
          throw `Error in transform: ${getTransformName(op)}, throwing ${e}`
        }
      }
      return result.value as any
    }
  }
}

const builder = new TransformBuilder()

function getBuilder<T>(): TransformOf<T> {
  return (builder as unknown as TransformBuilder<T>).transform!
  // return new TransformBuilder<T>()
}
export type TransformOf<T> = TransformBuilder<T>['transform']

export { getBuilder, TransformBuilder }
