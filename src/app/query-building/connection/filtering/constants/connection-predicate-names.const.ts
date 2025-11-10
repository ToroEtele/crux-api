import { ConnectionPredicateMap } from '../types/connection-predicate-map.type';

export const connectionPredicatesNames: ConnectionPredicateMap<string> = {
  arrayContainsLike: 'Array contains element like',
  arrayNotContainsLike: 'Array does not contain element like',
  beginsWith: 'Starts with',
  contains: 'Contains',
  endsWith: 'Ends with',
  eq: 'Equals',
  ge: 'Greater than or equal to',
  gt: 'Greater than',
  in: 'In',
  isEmpty: 'Is empty',
  isNull: 'Is NULL',
  le: 'Less than or equal to',
  lt: 'Less than',
  matchesRegex: 'Matches (REGEX)',
  ne: 'Not equals',
  notContains: 'Does not contain',
  notIn: 'Not in',
  notMatchesRegex: "Doesn't match (REGEX)"
};
