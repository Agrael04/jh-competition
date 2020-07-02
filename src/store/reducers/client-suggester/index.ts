import { createReducer, ActionType } from 'typesafe-actions'

import actions from 'store/actions/client-suggester'

import { ISearchedTrainee } from 'interfaces/trainee'

type IAction = ActionType<typeof actions>

export interface IState {
  loading: boolean
  options: ISearchedTrainee[]
}

const initialState: IState = {
  loading: false,
  options: [],
}

const reducer = createReducer<IState, IAction>(initialState)
  .handleAction(actions.search, () => ({
    loading: true,
    options: [],
  }))
  .handleAction(actions.searchSuccess, (state, { payload: { options } }) => ({
    loading: false,
    options,
  }))
  .handleAction(actions.searchCancel, () => ({
    loading: false,
    options: [],
  }))

export default reducer
