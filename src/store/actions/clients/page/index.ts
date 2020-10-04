import { createAction } from 'typesafe-actions'

export const changeOrder = createAction(
  'clients/page/START_FILTER_UPDATE',
  (orderKey: string) => ({ orderKey })
)()

export const actions = {
  changeOrder,
}

export default actions
