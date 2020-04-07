import constants from 'store/constants/schedule/page'

import removeTimeFromDate from 'utils/remove-time-from-date'

export interface IState {
  activeDate: Date
  activeGym: string
  activeResources: string[]
  openedTrainers: boolean
}

const initialState: IState = {
  activeDate: removeTimeFromDate(new Date())!,
  activeGym: '',
  openedTrainers: false,
  activeResources: [],
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
        activeResources: payload.resources,
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
