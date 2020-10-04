import { createAction } from 'typesafe-actions'

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

export const actions = {
  changeOrder,
  openClientDialog,
  closeClientDialog,
}

export default actions
