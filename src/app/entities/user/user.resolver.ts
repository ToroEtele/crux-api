import { Arg, Args, Authorized, FieldResolver, Mutation, Query, Resolver, Root } from 'type-graphql';
import { Inject, Service } from 'typedi';

import { InjectRepository } from '@entity-management/decorators/inject-repository.decorator';
import { RequestedFields } from '@entities/_common/decorators/requested-fields.decorator';
import { CurrentUser } from '@access-control/_common/decorators/current-user.decorator';
import { Context } from '@access-control/_common/decorators/auth-context.decorator';
import { ObjectId } from '@entities/_common/object-id/object-id';
import { pickBy, isEqual, isUndefined } from '@utils/ts-tools';

import { UserBaseResolver } from '@entities/_generated/entity-base-resolvers/user.base-resolver';
import { IConnection } from '@query-building/connection/interfaces/connection.interface';
import { IRequesterAuthContext } from '@common/interfaces/requester-context.interface';

import { Subscription } from '@entities/subscription/subscription.entity';
import { Farm } from '@entities/farm/farm.entity';
import { User } from './user.entity';

import { SubscriptionRepository } from '@entities/subscription/subscription.repository';
import { FarmRepository } from '@entities/farm/farm.repository';
import { UserRepository } from './user.repository';

import { QueryService } from '@query-building/query.service';

import { IConnectionArgs } from '@query-building/connection/interfaces/connection-args.interface';

import { FarmConnection, FarmsArgs } from '@entities/_generated/entity-connections/farm.connection';
import { EmailVerificationState } from './enums/email-verification-state.enum';
import { ForgotPasswordService } from './services/forgot-password.service';
import { ConfirmEmailService } from './services/confirm-email.service';

import { ResetPasswordInput } from './types/reset-password.input-type';
import { UpdateUserInput } from './types/update-user.input-type';

@Service()
@Resolver((_of) => User)
export class UserResolver extends UserBaseResolver {
  constructor(
    @InjectRepository(Subscription) private subscriptionRepository: SubscriptionRepository,
    @InjectRepository(Farm) private farmRepository: FarmRepository,
    @InjectRepository(User) private repository: UserRepository,
    @Inject((_type) => ForgotPasswordService) private forgotPasswordService: ForgotPasswordService,
    @Inject((_type) => ConfirmEmailService) private confirmEmailService: ConfirmEmailService
  ) {
    super(repository);
  }

  @Query((_type) => User, { nullable: true })
  public async me(@CurrentUser() user: User): Promise<User | null> {
    return user;
  }

  @Authorized()
  @Mutation((_type) => User)
  public async updateUser(@Arg('input') input: UpdateUserInput, @CurrentUser() user: User): Promise<User> {
    return await this.repository.update(user, this.getUpdateParams(user, input));
  }

  private getUpdateParams(user: User, input: UpdateUserInput): UpdateUserInput {
    const userPartial: Partial<User> = input;
    return pickBy(userPartial, (value, key) => !isUndefined(value) && !isEqual(value, user[key]));
  }

  @Mutation((_type) => EmailVerificationState)
  public async verifyEmail(@Arg('token') token: string, @CurrentUser() user: User): Promise<EmailVerificationState> {
    return await this.confirmEmailService.verifyEmail(token, user);
  }

  @Mutation((_returns) => Boolean)
  async resetPassword(@Arg('input', (_type) => ResetPasswordInput) input: ResetPasswordInput, @Context() context: IRequesterAuthContext): Promise<boolean> {
    return await this.forgotPasswordService.resetPassword({ ...input, context });
  }

  @FieldResolver((_type) => ObjectId, { nullable: true })
  async avatarImageId(@Root() user: User): Promise<ObjectId | null> {
    return user?.avatarImageId ? new ObjectId({ id: user.avatarImageId, type: 'AvatarImage' }) : null;
  }

  @FieldResolver((_type) => Subscription, { nullable: true })
  async activeSubscription(@Root() user: User): Promise<Subscription | null> {
    if (!user.stripeCustomerId) return null;
    return await this.subscriptionRepository
      .createQueryBuilder()
      .where({ stripeCustomerId: { eq: user.stripeCustomerId }, status: { eq: 'active' } })
      .getOne();
  }

  @FieldResolver((_type) => FarmConnection)
  async farms(
    @Root() user: User,
    @Args((_type) => FarmsArgs) args: IConnectionArgs<Farm>,
    @RequestedFields() requestedFields: string[]
  ): Promise<IConnection<Farm>> {
    const farmsQuery = this.farmRepository.createQueryBuilder();
    const queryService = new QueryService(farmsQuery).applyFilter({ ...args.filter, ownerId: { eq: user.id } }).applySorting(args.orderBy);
    return await queryService.getConnection(args, requestedFields);
  }
}
