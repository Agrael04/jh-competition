import { createReducer, ActionType } from 'typesafe-actions'

import actions from 'store/actions/schedule/page'

import removeTimeFromDate from 'utils/remove-time-from-date'

type IAction = ActionType<typeof actions>

export interface IState {
  activeDate: Date
  activeGym: string
  activeResources: string[]
  activeTime: number
  openedTrainers: boolean
}

const initialState: IState = {
  activeDate: removeTimeFromDate(new Date())!,
  activeGym: '',
  activeResources: [],
  activeTime: 0,
  openedTrainers: false,
}

const reducer = createReducer<IState, IAction>(initialState)
  .handleAction(actions.setActiveDate, (state, { payload: { date } }) => ({
    ...state,
    activeDate: removeTimeFromDate(date)!,
  }))
  .handleAction(actions.setActiveGym, (state, { payload: { gym, resources } }) => ({
    ...state,
    activeGym: gym,
    activeResources: resources,
  }))
  .handleAction(actions.setActiveResources, (state, { payload: { resources } }) => ({
    ...state,
    activeResources: resources.sort((a, b) => a > b ? 1 : a < b ? -1 : 0),
  }))
  .handleAction(actions.setActiveTime, (state, { payload: { time } }) => ({
    ...state,
    activeTime: time,
  }))
  .handleAction(actions.toggleOpenedTrainers, state => ({
    ...state,
    openedTrainers: !state.openedTrainers,
  }))

export default reducer
