import { createReducer, ActionType } from 'typesafe-actions'
import moment from 'moment'

import actions from './actions'
import { IFiltersForm } from 'routes/records/filters-dialog'

type IAction = ActionType<typeof actions>

export interface IState {
  filters: IFiltersForm

  openedFiltersDialog: boolean
}

const initialState: IState = {
  filters: {
    date: moment().startOf('month'),
    gym: undefined,
    trainer: undefined,
    types: [],
  },
  openedFiltersDialog: false,
}

const reducer = createReducer<IState, IAction>(initialState)
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
