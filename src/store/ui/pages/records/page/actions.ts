import { createAction } from 'typesafe-actions'

import { IFiltersForm } from 'routes/records/filters-dialog'

export const startFilterUpdate = createAction(
  '@ui/pages/records/page/START_FILTER_UPDATE'
)()

export const cancelFilterUpdate = createAction(
  '@ui/pages/records/page/CANCEL_FILTER_UPDATE'
)()

export const completeFilterUpdate = createAction(
  '@ui/pages/records/page/COMPLETE_FILTER_UPDATE',
  (filters: IFiltersForm) => ({ filters })
)()

export const actions = {
  startFilterUpdate,
  cancelFilterUpdate,
  completeFilterUpdate,
}

export default actions
