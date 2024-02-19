import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
export class FcEntity {
  id: number;

  @Field(() => Int, { description: 'Example field (placeholder)' })
  exampleField: number;
}
/*
  Faster CRUD decorators
*/