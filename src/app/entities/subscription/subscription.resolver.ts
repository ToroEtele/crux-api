import { Service } from 'typedi';
import { Resolver } from 'type-graphql';

import { SubscriptionBaseResolver } from '@entities/_generated/entity-base-resolvers/subscription.base-resolver';
import { Subscription } from './subscription.entity';

@Service()
@Resolver((_of) => Subscription)
export class SubscriptionResolver extends SubscriptionBaseResolver {}
