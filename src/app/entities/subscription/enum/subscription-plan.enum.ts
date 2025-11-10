import { registerEnumType } from 'type-graphql';

export enum SubscriptionPlan {
  free = 'free',
  individual = 'individual',
  company = 'company',
  enterprise = 'enterprise'
}

registerEnumType(SubscriptionPlan, {
  name: 'SubscriptionPlan',
  description: 'The current subscription plan'
});
