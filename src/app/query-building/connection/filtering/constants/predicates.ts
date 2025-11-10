import { registerGraphQLEnum } from '../../../../entities/_common/decorators/register-graphql-enum';

export enum ConnectionPredicate {
  arrayContainsLike = 'arrayContainsLike',
  arrayNotContainsLike = 'arrayNotContainsLike',
  beginsWith = 'beginsWith',
  contains = 'contains',
  endsWith = 'endsWith',
  eq = 'eq',
  ge = 'ge',
  gt = 'gt',
  in = 'in',
  isEmpty = 'isEmpty',
  isNull = 'isNull',
  le = 'le',
  lt = 'lt',
  matchesRegex = 'matchesRegex',
  ne = 'ne',
  notContains = 'notContains',
  notIn = 'notIn',
  notMatchesRegex = 'notMatchesRegex'
}

registerGraphQLEnum(ConnectionPredicate, {
  name: 'ConnectionPredicate'
});
