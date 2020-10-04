import { createReducer, ActionType } from 'typesafe-actions'

import actions from 'store/actions/clients/page'

type IAction = ActionType<typeof actions>

export interface IState {
  activeOrder: {
    orderKey: string
    direction: 'asc' | 'desc'
  }

  clientDialog: {
    opened: boolean
    id?: string
  }
}

const initialState: IState = {
  activeOrder: {
    orderKey: 'fullName',
    direction: 'asc',
  },
  clientDialog: {
    opened: false,
    id: undefined,
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
  .handleAction(actions.openClientDialog, (state, { payload: { id } }) => ({
    ...state,
    clientDialog: {
      opened: true,
      id,
    },
  }))
  .handleAction(actions.closeClientDialog, state => ({
    ...state,
    clientDialog: {
      opened: false,
      id: undefined,
    },
  }))
export default reducer
