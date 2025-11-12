import { FieldResolver, Resolver, Root } from 'type-graphql';
import { Service } from 'typedi';

import { InjectRepository } from '@entity-management/decorators/inject-repository.decorator';
import { ExerciseBaseResolver } from '../_generated/entity-base-resolvers/exercise.base-resolver';

import { Category } from '../category/category.entity';
import { Exercise } from './exercise.entity';

import { CategoryRepository } from '../category/category.repository';
import { ExerciseRepository } from './exercise.repository';

@Service()
@Resolver((_of) => Exercise)
export class ExerciseResolver extends ExerciseBaseResolver {
  constructor(
    @InjectRepository(Exercise)
    private repository: ExerciseRepository,
    @InjectRepository(Category)
    private categoryRepository: CategoryRepository
  ) {
    super(repository);
  }

  @FieldResolver((_type) => Category)
  async category(@Root() exercise: Exercise): Promise<Category> {
    return await this.categoryRepository.findOneOrThrow(exercise.categoryId);
  }
}
