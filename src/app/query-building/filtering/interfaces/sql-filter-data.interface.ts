import { ObjectLiteral } from 'typeorm'

export interface ISqlFilterData {
  parameters: ObjectLiteral
  condition: string
}
