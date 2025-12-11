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
import { PlanWorkoutExerciseSetOverride } from '../../plan-workout-exercise-set-override/plan-workout-exercise-set-override.entity';
import {
  PlanWorkoutExerciseSetOverrideConnection,
  PlanWorkoutExerciseSetOverridesArgs,
} from '../entity-connections/plan-workout-exercise-set-override.connection';

@Resolver(_of => PlanWorkoutExerciseSetOverride)
@Service()
export abstract class PlanWorkoutExerciseSetOverrideBaseResolver {
  @Inject(_type => ScopingService) protected scopingService!: ScopingService;

  constructor(private readonly entityRepository: IBaseRepository<PlanWorkoutExerciseSetOverride>) {}

  @AuthorizedAdmin()
  @Query(_returns => PlanWorkoutExerciseSetOverride, {
    description: 'Find PlanWorkoutExerciseSetOverride by Object ID.',
  })
  public async getPlanWorkoutExerciseSetOverride(
    @Arg('id', _type => ObjectId) id: ObjectId,
    @InjectScoped('id.id', PlanWorkoutExerciseSetOverride) entity: PlanWorkoutExerciseSetOverride,
  ): Promise<PlanWorkoutExerciseSetOverride> {
    return entity;
  }

  @AuthorizedAdmin()
  @Query(_returns => PlanWorkoutExerciseSetOverrideConnection, {
    description: 'Find PlanWorkoutExerciseSetOverrides by connection arguments.',
  })
  public async getPlanWorkoutExerciseSetOverrides(
    @Args(_type => PlanWorkoutExerciseSetOverridesArgs) args: IConnectionArgs<PlanWorkoutExerciseSetOverride>,
    @RequestedFields() requestedFields: string[],
    @AuthContext() authContext: IRequesterAuthContext,
  ): Promise<IConnection<PlanWorkoutExerciseSetOverride>> {
    const { filter, orderBy } = args;
    return await new QueryService(this.scopingService.createScopedQuery(authContext, PlanWorkoutExerciseSetOverride))
      .applyFilter(filter)
      .applySorting(orderBy)
      .getConnection({ ...args, maxEntities: 1000 }, requestedFields);
  }

  @FieldResolver()
  public id(@Root() { id }: PlanWorkoutExerciseSetOverride): ObjectId {
    return new ObjectId({ id, type: 'PlanWorkoutExerciseSetOverride' });
  }

  @FieldResolver()
  public rawID(@Root() { id }: PlanWorkoutExerciseSetOverride): string {
    return String(id);
  }
}
