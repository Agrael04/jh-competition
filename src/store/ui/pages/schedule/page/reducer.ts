import { createReducer, ActionType } from 'typesafe-actions'
import moment, { Moment } from 'moment'

import actions from './actions'

type IAction = ActionType<typeof actions>

export interface IState {
  activeTime: number

  filters: {
    date: Moment
    gym: string
    resources: string[]
  }

  openedFiltersDialog: boolean
}

const initialState: IState = {
  activeTime: 0,

  openedFiltersDialog: false,
  filters: {
    date: moment().startOf('day'),
    gym: '',
    resources: [],
  },
}

const reducer = createReducer<IState, IAction>(initialState)
  .handleAction(actions.setActiveTime, (state, { payload: { time } }) => ({
    ...state,
    activeTime: time,
  }))
  .handleAction(actions.startFiltersUpdate, state => ({
    ...state,
    openedFiltersDialog: true,
  }))
  .handleAction(actions.cancelFiltersUpdate, state => ({
    ...state,
    openedFiltersDialog: false,
  }))
  .handleAction(actions.setFilters, (state, { payload: { filters } }) => ({
    ...state,
    filters: {
      ...state.filters,
      ...filters,
    },
  }))
  .handleAction(actions.completeFiltersUpdate, (state, { payload: { filters } }) => ({
    ...state,
    filters,
    openedFiltersDialog: false,
  }))

export default reducer
