import { ArgsDictionary } from 'type-graphql';

import { DatabaseUtil } from '@entity-management/utils/database.util';

import { SubscriptionPlan } from '@entities/subscription/enum/subscription-plan.enum';

import { Farm } from '@entities/farm/farm.entity';
import { User } from '@entities/user/user.entity';
import { OrderDirection } from '@query-building/sorting/constants/order-direction.enum';

export const allowedNumberOfFarms = {
  [SubscriptionPlan.free]: 1,
  [SubscriptionPlan.individual]: 1,
  [SubscriptionPlan.company]: 2,
  [SubscriptionPlan.enterprise]: 5
};

export const subscriptionRules = {
  createFarm: {
    ...ruleForTiers([SubscriptionPlan.free, SubscriptionPlan.individual, SubscriptionPlan.company, SubscriptionPlan.enterprise], (plan: SubscriptionPlan) => {
      return async (user: User) => {
        const farms = await DatabaseUtil.getRepository(Farm)
          .createQueryBuilder()
          .where({ ownerId: { eq: user.id } })
          .getCount();
        if (farms === allowedNumberOfFarms[plan] - 1) {
          return true;
        }
        return false;
      };
    })
  },
  farm: {
    ...ruleForTiers([SubscriptionPlan.free, SubscriptionPlan.individual, SubscriptionPlan.company, SubscriptionPlan.enterprise], (plan: SubscriptionPlan) => {
      return async (user: User, args: ArgsDictionary) => {
        const repo = DatabaseUtil.getRepository(Farm);
        const farmId = args.id;

        // Get all user's farms ordered by creation date
        const farms = await repo
          .createQueryBuilder()
          .where({ ownerId: { eq: user.id } })
          .orderBy('farm.createdAt', OrderDirection.ASC)
          .getMany();

        const allowedFarms = farms.slice(0, allowedNumberOfFarms[plan]);
        return allowedFarms.some((f) => f.id.toString() === farmId.id);
      };
    })
  }
};

function ruleForTiers(tiers: SubscriptionPlan[], fn: (plan: SubscriptionPlan) => Rule): Record<SubscriptionPlan, Rule> {
  return Object.fromEntries(tiers.map((t) => [t, fn(t)])) as Record<SubscriptionPlan, Rule>;
}

type Rule = (user: User, args: ArgsDictionary) => boolean | Promise<boolean>;
