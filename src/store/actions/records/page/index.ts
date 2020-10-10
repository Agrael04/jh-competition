import { createAction } from 'typesafe-actions'

import { IFiltersForm } from 'routes/records/filters-dialog'

export const startFilterUpdate = createAction(
  'records/page/START_FILTER_UPDATE'
)()

export const cancelFilterUpdate = createAction(
  'records/page/CANCEL_FILTER_UPDATE'
)()

export const completeFilterUpdate = createAction(
  'records/page/COMPLETE_FILTER_UPDATE',
  (filters: IFiltersForm) => ({ filters })
)()

export const actions = {
  startFilterUpdate,
  cancelFilterUpdate,
  completeFilterUpdate,
}

export default actions
