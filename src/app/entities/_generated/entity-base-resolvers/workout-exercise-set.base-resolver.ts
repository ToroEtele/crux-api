// This file was generated automatically.
// All manual modifications will be lost!
import { Arg, Args, Query, FieldResolver, Root, Resolver } from 'type-graphql';
import { Inject, Service } from 'typedi';

import { IRequesterAuthContext } from '../../../_common/interfaces/requester-context.interface';
import { AuthContext } from '../../../access-control/_common/decorators/auth-context.decorator';
import { AuthorizedAdmin } from '../../../access-control/authorization/authorized-admin.decorator';
import { InjectScoped } from '../../../access-control/scoping/inject-scoped.decorator';
import { ScopingService } from '../../../access-control/scoping/scoping.service';
import { IBaseRepository } from '../../../entity-management/interfaces/base-repository.interface';
import { IConnectionArgs } from '../../../query-building/connection/interfaces/connection-args.interface';
import { IConnection } from '../../../query-building/connection/interfaces/connection.interface';
import { QueryService } from '../../../query-building/query.service';
import { ObjectId } from '../../_common/object-id/object-id';
import { RequestedFields } from '../../_common/decorators/requested-fields.decorator';
import { WorkoutExerciseSet } from '../../workout-exercise-set/workout-exercise-set.entity';
import {
  WorkoutExerciseSetConnection,
  WorkoutExerciseSetsArgs,
} from '../entity-connections/workout-exercise-set.connection';

@Resolver(_of => WorkoutExerciseSet)
@Service()
export abstract class WorkoutExerciseSetBaseResolver {
  @Inject(_type => ScopingService) protected scopingService!: ScopingService;

  constructor(private readonly entityRepository: IBaseRepository<WorkoutExerciseSet>) {}

  @AuthorizedAdmin()
  @Query(_returns => WorkoutExerciseSet, { description: 'Find WorkoutExerciseSet by Object ID.' })
  public async getWorkoutExerciseSet(
    @Arg('id', _type => ObjectId) id: ObjectId,
    @InjectScoped('id.id', WorkoutExerciseSet) entity: WorkoutExerciseSet,
  ): Promise<WorkoutExerciseSet> {
    return entity;
  }

  @AuthorizedAdmin()
  @Query(_returns => WorkoutExerciseSetConnection, { description: 'Find WorkoutExerciseSets by connection arguments.' })
  public async getWorkoutExerciseSets(
    @Args(_type => WorkoutExerciseSetsArgs) args: IConnectionArgs<WorkoutExerciseSet>,
    @RequestedFields() requestedFields: string[],
    @AuthContext() authContext: IRequesterAuthContext,
  ): Promise<IConnection<WorkoutExerciseSet>> {
    const { filter, orderBy } = args;
    return await new QueryService(this.scopingService.createScopedQuery(authContext, WorkoutExerciseSet))
      .applyFilter(filter)
      .applySorting(orderBy)
      .getConnection({ ...args, maxEntities: 1000 }, requestedFields);
  }

  @FieldResolver()
  public id(@Root() { id }: WorkoutExerciseSet): ObjectId {
    return new ObjectId({ id, type: 'WorkoutExerciseSet' });
  }

  @FieldResolver()
  public rawID(@Root() { id }: WorkoutExerciseSet): string {
    return String(id);
  }
}
