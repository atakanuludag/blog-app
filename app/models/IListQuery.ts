import { GridSortDirection } from '@mui/x-data-grid/models/gridSortModel'
import { OrderType } from './enums'
export default interface IListQuery {
  pageSize?: number
  page?: number
  order?: string
  orderBy?: OrderType | GridSortDirection | null
  s?: string
  sType?: string
}
