import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateFcEntityInput {
  @Field(() => Int, { description: 'Example field (placeholder)' })
  exampleField: number;
}
