import { createMethodMiddlewareDecorator } from 'type-graphql';

import { UnauthorizedError } from '@errors/unauthorized.error';
import { subscriptionRules } from '../rules/subscription.rules';
import { SubscriptionPlan } from '@entities/subscription/enum/subscription-plan.enum';
import { RequesterContext } from '../../_common/requester-context';

export function RequiresSubscription(minimumRequiredTier?: SubscriptionPlan): MethodDecorator {
  return createMethodMiddlewareDecorator<RequesterContext>(async ({ args, context, info }, next) => {
    const { authContext, isSystemAdmin } = context;
    const user = authContext.user;
    const subscription = authContext.subscription;

    if (isSystemAdmin) {
      await next();
    }

    if (minimumRequiredTier && subscription && minimumRequiredTier > subscription.plan) {
      throw new UnauthorizedError();
    }

    const resolverName = info.fieldName;
    const appliedRule = subscriptionRules[resolverName]?.[subscription?.plan ?? 'free'];

    if (appliedRule) {
      const isAuthorized = await appliedRule(user, args);
      if (!isAuthorized) {
        throw new UnauthorizedError();
      }
    }

    await next();
  });
}
