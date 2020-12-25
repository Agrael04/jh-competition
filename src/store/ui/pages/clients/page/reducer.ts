import { createReducer, ActionType } from 'typesafe-actions'

import actions from './actions'
import { IFiltersForm } from 'routes/clients/filters-dialog'

type IAction = ActionType<typeof actions>

export interface IState {
  activeOrder: {
    orderKey: string
    direction: 'asc' | 'desc'
  }

  filters: IFiltersForm,
  openedFiltersDialog: boolean,

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
  filters: {
    visitedAt: null,
    withDebt: false,
    age: null,
  },
  openedFiltersDialog: false,
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
  .handleAction(actions.startFilterUpdate, state => ({
    ...state,
    openedFiltersDialog: true,
  }))
  .handleAction(actions.cancelFilterUpdate, state => ({
    ...state,
    openedFiltersDialog: false,
  }))
  .handleAction(actions.completeFilterUpdate, (state, { payload: { filters } }) => ({
    ...state,
    filters,
    openedFiltersDialog: false,
  }))

export default reducer
