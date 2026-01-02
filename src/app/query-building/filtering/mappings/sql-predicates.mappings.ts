 
import { randomBytes } from 'node:crypto';

import { ConnectionPredicateMap } from '@query-building/connection/filtering/types/connection-predicate-map.type';
import { ISqlFilterData } from '../interfaces/sql-filter-data.interface';

export type FilterFunction = (field: string, value: unknown) => ISqlFilterData;

export const randomHex = (size = 64): string => {
  return randomBytes(size).toString('hex');
};

export const sqlPredicatesMappings: ConnectionPredicateMap<FilterFunction> = {
  arrayContainsLike: (column, value): ISqlFilterData => {
    const substitutionName = randomHex(8);

    return {
      parameters: {
        [substitutionName]: `%${value}%`
      },
      condition: `${column} LIKE :${substitutionName}`
    };
  },
  arrayNotContainsLike: (column, value): ISqlFilterData => {
    const substitutionName = randomHex(8);

    return {
      parameters: {
        [substitutionName]: `%${value}%`
      },
      condition: `${column} NOT LIKE :${substitutionName}`
    };
  },
  beginsWith: (column, value): ISqlFilterData => {
    const substitutionName = randomHex(8);

    return {
      parameters: {
        [substitutionName]: `${value}%`
      },
      condition: `${column} LIKE :${substitutionName}`
    };
  },
  contains: (column, value): ISqlFilterData => {
    const substitutionName = randomHex(8);

    return {
      parameters: {
        [substitutionName]: `%${value}%`
      },
      condition: `${column} LIKE :${substitutionName}`
    };
  },
  endsWith: (column, value): ISqlFilterData => {
    const substitutionName = randomHex(8);

    return {
      parameters: {
        [substitutionName]: `%${value}`
      },
      condition: `${column} LIKE :${substitutionName}`
    };
  },
  eq: (column, value): ISqlFilterData => {
    const substitutionName = randomHex(8);

    return {
      parameters: {
        [substitutionName]: value
      },
      condition: `${column} = :${substitutionName}`
    };
  },
  ge: (column, value): ISqlFilterData => {
    const substitutionName = randomHex(8);

    return {
      parameters: {
        [substitutionName]: value
      },
      condition: `${column} >= :${substitutionName}`
    };
  },
  gt: (column, value): ISqlFilterData => {
    const substitutionName = randomHex(8);

    return {
      parameters: {
        [substitutionName]: value
      },
      condition: `${column} > :${substitutionName}`
    };
  },
  in: (column, value): ISqlFilterData => {
    const substitutionName = randomHex(8);

    return {
      parameters: {
        [substitutionName]: value
      },
      condition: `${column} IN (:...${substitutionName})`
    };
  },
  isEmpty: (column, value): ISqlFilterData => {
    return {
      parameters: {},
      condition: value ? `(${column} = '' OR ${column} IS NULL)` : `(${column} <> '' AND ${column} IS NOT NULL)`
    };
  },
  isNull: (column, value): ISqlFilterData => {
    return {
      parameters: {},
      condition: value ? `${column} IS NULL` : `${column} IS NOT NULL`
    };
  },
  le: (column, value): ISqlFilterData => {
    const substitutionName = randomHex(8);

    return {
      parameters: {
        [substitutionName]: value
      },
      condition: `${column} <= :${substitutionName}`
    };
  },
  lt: (column, value): ISqlFilterData => {
    const substitutionName = randomHex(8);

    return {
      parameters: {
        [substitutionName]: value
      },
      condition: `${column} < :${substitutionName}`
    };
  },
  matchesRegex: (column, value): ISqlFilterData => {
    const substitutionName = randomHex(8);

    return {
      parameters: {
        [substitutionName]: value
      },
      condition: `regexp_matches(${column},:${substitutionName})`
    };
  },
  ne: (column, value): ISqlFilterData => {
    const substitutionName = randomHex(8);

    return {
      parameters: {
        [substitutionName]: value
      },
      condition: `${column} != :${substitutionName}`
    };
  },
  notIn: (column, value): ISqlFilterData => {
    const substitutionName = randomHex(8);

    return {
      parameters: {
        [substitutionName]: value
      },
      condition: `${column} NOT IN (:...${substitutionName})`
    };
  },
  notContains: (column, value): ISqlFilterData => {
    const substitutionName = randomHex(8);

    return {
      parameters: {
        [substitutionName]: `%${value}%`
      },
      condition: `${column} NOT LIKE :${substitutionName}`
    };
  },
  notMatchesRegex: (column, value): ISqlFilterData => {
    const substitutionName = randomHex(8);

    return {
      parameters: {
        [substitutionName]: value
      },
      condition: `NOT regexp_matches(${column},:${substitutionName})`
    };
  }
};
