import { ConnectionPredicate } from '../constants/predicates';

export type ConnectionPredicateMap<TValue> = {
  [TKey in ConnectionPredicate]: TValue;
};
