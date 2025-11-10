import { OrderDirection } from '../constants/order-direction.enum'

export interface ISort {
  field: string
  direction: OrderDirection
}
