import constants from 'store/constants/schedule/page'

import removeTimeFromDate from 'utils/remove-time-from-date'

export interface IState {
  activeDate: Date
  activeGym: number
  activeResources: number[]
  openedTrainers: boolean
}

const initialState: IState = {
  activeDate: removeTimeFromDate(new Date())!,
  activeGym: 1,
  openedTrainers: false,
  activeResources: [0, 1, 2, 3, 4, 5, 6, 7, 8],
}

export default (state = initialState, { type, payload }: { type: string, payload: any }): IState => {
  switch (type) {
    case constants.SET_ACTIVE_DATE: {
      return {
        ...state,
        activeDate: removeTimeFromDate(payload.date)!,
      }
    }

    case constants.SET_ACTIVE_GYM: {
      return {
        ...state,
        activeGym: payload.gym,
      }
    }

    case constants.SET_ACTIVE_RESOURCES: {
      return {
        ...state,
        activeResources: payload.resources.sort((a: number, b: number) => a - b),
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
