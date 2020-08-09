import { createAction } from 'typesafe-actions'
import { Moment } from 'moment'

export interface IFilters {
  date: Moment
  gym?: string
  trainer?: string
  types: string[]
}

export const startFilterUpdate = createAction(
  'records/page/START_FILTER_UPDATE'
)()

export const cancelFilterUpdate = createAction(
  'records/page/CANCEL_FILTER_UPDATE'
)()

export const completeFilterUpdate = createAction(
  'records/page/COMPLETE_FILTER_UPDATE',
  (filters: IFilters) => ({ filters })
)()

export const actions = {
  startFilterUpdate,
  cancelFilterUpdate,
  completeFilterUpdate,
}

export default actions
