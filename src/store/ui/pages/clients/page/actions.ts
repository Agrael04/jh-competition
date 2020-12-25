import { createAction } from 'typesafe-actions'

import { IFiltersForm } from 'routes/clients/filters-dialog'

export const changeOrder = createAction(
  '@ui/pages/clients/page/CHANGE_ORDER',
  (orderKey: string) => ({ orderKey })
)()

export const openClientDialog = createAction(
  '@ui/pages/clients/page/OPEN_CLIENT_DIALOG',
  (id?: string) => ({ id })
)()

export const closeClientDialog = createAction(
  '@ui/pages/clients/page/CLOSE_CLIENT_DIALOG'
)()

export const startFilterUpdate = createAction(
  '@ui/pages/clients/page/START_FILTER_UPDATE'
)()

export const cancelFilterUpdate = createAction(
  '@ui/pages/clients/page/CANCEL_FILTER_UPDATE'
)()

export const completeFilterUpdate = createAction(
  '@ui/pages/clients/page/COMPLETE_FILTER_UPDATE',
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
