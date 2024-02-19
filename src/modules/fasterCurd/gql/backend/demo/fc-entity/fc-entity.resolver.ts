import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { FcEntityService } from './fc-entity.service';
import { FcEntity } from './entities/fc-entity.entity';
import { CreateFcEntityInput } from './dto/create-fc-entity.input';
import { UpdateFcEntityInput } from './dto/update-fc-entity.input';

@Resolver(() => FcEntity)
export class FcEntityResolver {
  constructor(private readonly fcEntityService: FcEntityService) {}

  @Mutation(() => FcEntity)
  createFcEntity(@Args('createFcEntityInput') createFcEntityInput: CreateFcEntityInput) {
    return this.fcEntityService.create(createFcEntityInput);
  }

  @Query(() => [FcEntity], { name: 'fcEntity' })
  findAll() {
    return this.fcEntityService.findAll();
  }

  @Query(() => FcEntity, { name: 'fcEntity' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.fcEntityService.findOne(id);
  }

  @Mutation(() => FcEntity)
  updateFcEntity(@Args('updateFcEntityInput') updateFcEntityInput: UpdateFcEntityInput) {
    return this.fcEntityService.update(updateFcEntityInput.id, updateFcEntityInput);
  }

  @Mutation(() => FcEntity)
  removeFcEntity(@Args('id', { type: () => Int }) id: number) {
    return this.fcEntityService.remove(id);
  }
}
