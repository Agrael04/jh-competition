import constants from 'store/constants/schedule/page'

import removeTimeFromDate from 'utils/remove-time-from-date'

export interface IState {
  currentDate: Date
  currentGym: number
  openedTrainers: boolean
}

const initialState: IState = {
  currentDate: removeTimeFromDate(new Date())!,
  currentGym: 1,
  openedTrainers: false,
}

export default (state = initialState, { type, payload }: { type: string, payload: any }): IState => {
  switch (type) {
    case constants.SET_CURRENT_DATE: {
      return {
        ...state,
        currentDate: removeTimeFromDate(payload.date)!,
      }
    }

    case constants.SET_CURRENT_GYM: {
      return {
        ...state,
        currentGym: payload.gym,
      }
    }

    case constants.TOGGLE_OPENED_TRAINERS: {
      return {
        ...state,
        openedTrainers: !state.openedTrainers,
      }
    }

    default:
      return state
  }
}
