import { Brackets, QueryBuilder, WhereExpressionBuilder } from 'typeorm';
import _ from 'lodash';

import { IConnectionFilterInput } from '@query-building/connection/filtering/interfaces/connection-filter-input.interface';
import { ConnectionFilterOperator } from '@query-building/connection/filtering/constants/connection-filter-operator.enum';
import { ConnectionFilter, ConnectionFilterBase } from '@query-building/connection/filtering/interfaces/connection-filter.interface';
import { ISqlFilterData } from '@query-building/filtering/interfaces/sql-filter-data.interface';

import { sqlPredicatesMappings } from '@query-building/filtering/mappings/sql-predicates.mappings';
import { ConnectionPredicate } from '@query-building/filtering/constants/predicates';
import { Constructable } from '@common/base-types/constructable.type';

export class SqlConditionsService<TEntity extends {}> {
  private readonly mainAlias: string;

  constructor(
    private readonly entityClass: Constructable<TEntity>,
    builder: QueryBuilder<TEntity>
  ) {
    if (!builder.expressionMap.mainAlias) throw new Error('missing mainAlias for the query');

    this.mainAlias = builder.expressionMap.mainAlias.name;
  }

  public normalizeFilter(filter: ConnectionFilter): ConnectionFilter {
    return _.transform(filter, (result, value, key) => {
      if (Array.isArray(value) && (key === ConnectionFilterOperator.and || key === ConnectionFilterOperator.or)) {
        result[key] = value.map((filter) => this.normalizeFilter(filter));
      } else if (value && typeof value === 'object' && !Array.isArray(value)) {
         
        result[key] = _.omitBy(value, (v) => v === undefined || v === null);
      }
    });
  }

  public applyFilter<TBuilder extends WhereExpressionBuilder>(builder: TBuilder, filter: ConnectionFilter, joinedTableAlias?: string): TBuilder {
    const normalizedFilter = this.normalizeFilter(filter);
    return Object.entries(normalizedFilter).reduce((builder, [fieldOrOperator, value], index) => {
      switch (fieldOrOperator) {
        case ConnectionFilterOperator.and:
          return this.applyAndFilter(builder, <ConnectionFilter[]>value, index);
        case ConnectionFilterOperator.or:
          return this.applyOrFilters(builder, <ConnectionFilter[]>value, index);
        default:
          if (this.isJoinedTable(<IConnectionFilterInput<unknown>>value)) {
            return this.applyFilter(builder, this.normalizeFilter(<ConnectionFilter>value), fieldOrOperator);
          }
          if (index === 0) {
            return builder.where(this.getFilterInputBrackets(fieldOrOperator, <IConnectionFilterInput<unknown>>value, joinedTableAlias));
          }
          return builder.andWhere(this.getFilterInputBrackets(fieldOrOperator, <IConnectionFilterInput<unknown>>value, joinedTableAlias));
      }
    }, builder);
  }

  private applyAndFilter<TBuilder extends WhereExpressionBuilder>(outerBuilder: TBuilder, filters: ConnectionFilter[], outerIndex: number): TBuilder {
    const nestedBuilder = new Brackets((qb) =>
      filters.reduce((builder, filter, index) => {
        if (index === 0) return builder.where(this.getOperatorBrackets(filter));
        return builder.andWhere(this.getOperatorBrackets(filter));
      }, qb)
    );
    if (outerIndex === 0) return outerBuilder.where(nestedBuilder);
    return outerBuilder.andWhere(nestedBuilder);
  }

  private applyOrFilters<TBuilder extends WhereExpressionBuilder>(outerBuilder: TBuilder, filters: ConnectionFilter[], outerIndex: number): TBuilder {
    const nestedBuilder = new Brackets((qb) =>
      filters.reduce((builder, filter, index) => {
        if (index === 0) return builder.where(this.getOperatorBrackets(filter));
        return builder.orWhere(this.getOperatorBrackets(filter));
      }, qb)
    );
    if (outerIndex === 0) return outerBuilder.where(nestedBuilder);
    return outerBuilder.andWhere(nestedBuilder);
  }

  private getOperatorBrackets(filter: ConnectionFilter): Brackets {
    return new Brackets((queryBuilder) => this.applyFilter(queryBuilder, filter));
  }

  private getFilterInputBrackets(field: string, filter: IConnectionFilterInput<unknown>, joinedTableAlias?: string): Brackets {
    return new Brackets((queryBuilder) => this.applyInputFilter(queryBuilder, field, filter, joinedTableAlias));
  }

  private applyInputFilter<TBuilder extends WhereExpressionBuilder>(
    builder: TBuilder,
    field: string,
    filter: IConnectionFilterInput<unknown>,
    joinedTableAlias?: string
  ): TBuilder {
    return Object.entries(filter).reduce((builder, [predicate, value], index) => {
      const whereFunction = index === 0 ? builder.where.bind(builder) : builder.andWhere.bind(builder);
      const connectionPredicate = <ConnectionPredicate>predicate;
      const columnPath = `\`${joinedTableAlias ?? this.mainAlias}\`.\`${_.snakeCase(field)}\``;
      const { condition, parameters } = this.getFilterValue(connectionPredicate, columnPath, value);
      return whereFunction(condition, parameters);
    }, builder);
  }

  private getFilterValue(predicate: ConnectionPredicate, columnPath: string, value: unknown): ISqlFilterData {
    const filterFunction = sqlPredicatesMappings[predicate];
    return filterFunction(columnPath, value);
  }

  private verifyPredicate(predicate: string): boolean {
    const maybePredicate = <ConnectionPredicate>predicate;
    if (Object.values(ConnectionPredicate).includes(maybePredicate)) return true;
    return false;
  }

  public checkPredicate(predicate: string): ConnectionPredicate {
    if (!this.verifyPredicate(predicate)) throw new Error(`Invalid predicate: ${predicate}`);

    return <ConnectionPredicate>predicate;
  }

  private isJoinedTable(filter: ConnectionFilterBase<unknown>): boolean {
    Object.values(filter).every((value) => {
      return typeof value === 'object';
    });
    return Object.values(filter).every((value) => typeof value === 'object' && !Array.isArray(value));
  }
}
