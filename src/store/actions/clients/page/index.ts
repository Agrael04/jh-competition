import { createAction } from 'typesafe-actions'

import { IFiltersForm } from 'routes/clients/filters-dialog'

export const changeOrder = createAction(
  'clients/page/CHANGE_ORDER',
  (orderKey: string) => ({ orderKey })
)()

export const openClientDialog = createAction(
  'clients/page/OPEN_CLIENT_DIALOG',
  (id?: string) => ({ id })
)()

export const closeClientDialog = createAction(
  'clients/page/CLOSE_CLIENT_DIALOG'
)()

export const startFilterUpdate = createAction(
  'clients/page/START_FILTER_UPDATE'
)()

export const cancelFilterUpdate = createAction(
  'clients/page/CANCEL_FILTER_UPDATE'
)()

export const completeFilterUpdate = createAction(
  'clients/page/COMPLETE_FILTER_UPDATE',
  (filters: IFiltersForm) => ({ filters })
)()

export const actions = {
  changeOrder,
  openClientDialog,
  closeClientDialog,
  startFilterUpdate,
  cancelFilterUpdate,
  completeFilterUpdate,
}

export default actions
