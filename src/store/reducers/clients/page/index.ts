import { createReducer, ActionType } from 'typesafe-actions'

import actions from 'store/actions/clients/page'

type IAction = ActionType<typeof actions>

export interface IState {
  activeOrder: {
    orderKey: string
    direction: 'asc' | 'desc'
  }
}

const initialState: IState = {
  activeOrder: {
    orderKey: 'fullName',
    direction: 'asc',
  },
}

const reducer = createReducer<IState, IAction>(initialState)
  .handleAction(actions.changeOrder, (state, { payload: { orderKey } }) => ({
    ...state,
    activeOrder: {
      orderKey,
      direction: state.activeOrder.orderKey !== orderKey
        ? 'asc'
        : state.activeOrder.direction === 'desc'
          ? 'asc'
          : 'desc',
    },
  }))
export default reducer
