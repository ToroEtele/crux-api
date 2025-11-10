import { registerEnumType } from 'type-graphql'

export enum OrderDirection {
  'ASC' = 'ASC',
  'DESC' = 'DESC'
}

registerEnumType(OrderDirection, {
  name: 'OrderDirection',
  description: 'Possible directions in which to order a list of items when provided an `orderBy` argument.'
})
