import { Factory } from 'rosie';
import { DatabaseUtil } from '@entity-management/utils/database.util';
import { Subscription } from '@entities/subscription/subscription.entity';
import { SubscriptionPlan } from '@entities/subscription/enum/subscription-plan.enum';

export const subscriptionFactory = Factory.define<Subscription>('subscription')
  .attr('plan', SubscriptionPlan.free)
  .sequence('referenceId', (n) => `sub-ref-${n}`)
  .attr('status', 'active')
  .attr('stripeCustomerId', null)
  .attr('stripeSubscriptionId', null)
  .attr('periodStart', () => Math.floor(Date.now() / 1000))
  .attr('periodEnd', () => Math.floor(Date.now() / 1000) + 30 * 24 * 60 * 60)
  .attr('cancelAtPeriodEnd', false)
  .attr('seats', 1)
  .attr('trialStart', null)
  .attr('trialEnd', null);

export async function createSubscription(opts: Partial<Subscription> = {}): Promise<Subscription> {
  const subscriptionRepository = DatabaseUtil.getRepository(Subscription);
  const subscription = subscriptionRepository.build(subscriptionFactory.build(opts));
  return await subscriptionRepository.save(subscription);
}
