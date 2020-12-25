import { createReducer, ActionType } from 'typesafe-actions'

import actions from './actions'

type IAction = ActionType<typeof actions>

export interface IState {
  opened: boolean
}

const initialState: IState = {
  opened: false,
}

const reducer = createReducer<IState, IAction>(initialState)
  .handleAction(actions.open, state => ({
    ...state,
    opened: true,
  }))
  .handleAction(actions.close, () => initialState)

export default reducer
