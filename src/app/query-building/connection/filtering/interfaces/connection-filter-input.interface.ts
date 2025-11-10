import { ConnectionPredicate } from '../constants/predicates';
import { Maybe } from '@common/base-types/maybe.type';

export interface IConnectionFilterInput<TValue> {
  [ConnectionPredicate.arrayContainsLike]?: Maybe<TValue>;
  [ConnectionPredicate.arrayNotContainsLike]?: Maybe<TValue>;
  [ConnectionPredicate.beginsWith]?: Maybe<string>;
  [ConnectionPredicate.contains]?: Maybe<string>;
  [ConnectionPredicate.endsWith]?: Maybe<string>;
  [ConnectionPredicate.eq]?: Maybe<TValue>;
  [ConnectionPredicate.ge]?: Maybe<TValue>;
  [ConnectionPredicate.gt]?: Maybe<TValue>;
  [ConnectionPredicate.in]?: Maybe<TValue[]>;
  [ConnectionPredicate.isEmpty]?: Maybe<boolean>;
  [ConnectionPredicate.isNull]?: Maybe<boolean>;
  [ConnectionPredicate.le]?: Maybe<TValue>;
  [ConnectionPredicate.lt]?: Maybe<TValue>;
  [ConnectionPredicate.matchesRegex]?: Maybe<string>;
  [ConnectionPredicate.ne]?: Maybe<TValue>;
  [ConnectionPredicate.notContains]?: Maybe<string>;
  [ConnectionPredicate.notIn]?: Maybe<TValue[]>;
  [ConnectionPredicate.notMatchesRegex]?: Maybe<string>;
}
