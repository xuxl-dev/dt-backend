export interface TransformFunction<T, R> {
  (source: T): R
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
  transform<A, B, C, D, E, F, G, H>(
    op1: TransformFunction<Target, A>,
    op2: TransformFunction<A, B>,
    op3: TransformFunction<B, C>,
    op4: TransformFunction<C, D>,
    op5: TransformFunction<D, E>,
    op6: TransformFunction<E, F>,
    op7: TransformFunction<F, G>,
    op8: TransformFunction<G, H>,
    ...rest: TransformFunction<any, any>[]
  ): (data: Target) => any

  transform(...ops: TransformFunction<any, any>[]) {
    return <I>(data: I) => ops.reduce((acc, op) => op(acc), data)
  }
}

const builder = new TransformBuilder()

function getBuilder<T>(target?: T) : TransformOf<T> {
  return (builder as unknown as TransformBuilder<T>).transform
  // return new TransformBuilder<T>()
}
export type TransformOf<T> = TransformBuilder<T>['transform']

export {
  getBuilder,
  TransformBuilder
}