import { CreateFcEntityInput } from './create-fc-entity.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateFcEntityInput extends PartialType(CreateFcEntityInput) {
  @Field(() => Int)
  id: number;
}
