import { ObjectType, Field, Int } from '@nestjs/graphql';
import { ClassType } from 'src/utils/utils';

@ObjectType()
@Query({
})
export class FcEntity {
  id: number;

  @Field(() => Int, { description: 'Example field (placeholder)' })
  exampleField: number;
}
/*
  Faster CRUD decorators
*/

export function Query<T extends ClassType<T>, K>(
  cfg: ActionCfg<InstanceType<T>>
) {
  return function classDecorator(target: T) {

  }
}

type ActionCfg<T extends InstanceType<any>> = {
  requires?: PartialTuple<KeyTuple<T>>
}

// union to intersection of functions
type UnionToIoF<U> =
    (U extends any ? (k: (x: U) => void) => void : never) extends
    ((k: infer I) => void) ? I : never

// return last element from Union
type UnionPop<U> = UnionToIoF<U> extends { (a: infer A): void; } ? A : never;

// prepend an element to a tuple.
type Prepend<U, T extends any[]> =
    ((a: U, ...r: T) => void) extends (...r: infer R) => void ? R : never;

type UnionToTupleRecursively<Union, Result extends any[]> = {
    1: Result;
    0: UnionToTupleRecursively_<Union, UnionPop<Union>, Result>;
    // 0: UnionToTupleRecursively<Exclude<Union, UnionPop<Union>>, Prepend<UnionPop<Union>, Result>>
}[[Union] extends [never] ? 1 : 0];

type UnionToTupleRecursively_<Union, Element, Result extends any[]> =
    UnionToTupleRecursively<Exclude<Union, Element>, Prepend<Element, Result>>;

type UnionToTuple<U> = UnionToTupleRecursively<U, []>;

type KeyTuple<T> = UnionToTuple<keyof T>

type PartialTuple<T> = {
  [K in keyof T]?: T[K] | undefined
}

type FieldSelecor<T> = keyof T