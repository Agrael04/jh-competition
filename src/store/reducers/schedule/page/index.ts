import { createReducer, ActionType } from 'typesafe-actions'
import moment, { Moment } from 'moment'

import actions from 'store/actions/schedule/page'

type IAction = ActionType<typeof actions>

export interface IState {
  activeTime: number
  openedTrainers: boolean

  filters: {
    date: Moment
    gym: string
    resources: string[]
  }

  openedFiltersDialog: boolean
}

const initialState: IState = {
  activeTime: 0,
  openedTrainers: false,

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
  .handleAction(actions.toggleOpenedTrainers, state => ({
    ...state,
    openedTrainers: !state.openedTrainers,
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
