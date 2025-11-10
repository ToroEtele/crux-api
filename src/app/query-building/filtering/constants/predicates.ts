import { registerEnumType } from 'type-graphql';

export enum ConnectionPredicate {
  beginsWith = 'beginsWith',
  endsWith = 'endsWith',
  contains = 'contains',
  in = 'in',
  isNull = 'isNull',
  gt = 'gt',
  ge = 'ge',
  lt = 'lt',
  le = 'le',
  matchesRegex = 'matchesRegex',
  eq = 'eq',
  ne = 'ne'
}

registerEnumType(ConnectionPredicate, {
  name: 'ConnectionPredicate',
  description: 'Connection predicate'
});
