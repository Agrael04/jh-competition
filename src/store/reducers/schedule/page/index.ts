import constants from 'store/constants/schedule/page'

import removeTimeFromDate from 'utils/remove-time-from-date'

export interface IState {
  activeDate: Date
  activeGym: string
  activeResources: string[]
  activeTime: number
  openedTrainers: boolean

  activeContact: string | null
  openedCheckDialog: boolean
}

const initialState: IState = {
  activeDate: removeTimeFromDate(new Date())!,
  activeGym: '',
  activeResources: [],
  activeTime: 0,
  openedTrainers: false,

  activeContact: null,
  openedCheckDialog: false,
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

    case constants.SET_ACTIVE_TIME: {
      return {
        ...state,
        activeTime: payload.time,
      }
    }

    case constants.TOGGLE_OPENED_TRAINERS: {
      return {
        ...state,
        openedTrainers: !state.openedTrainers,
      }
    }

    case constants.OPEN_CHECK_DIALOG: {
      return {
        ...state,
        openedCheckDialog: true,
        activeContact: payload.contact,
      }
    }

    case constants.CLOSE_CHECK_DIALOG: {
      return {
        ...state,
        openedCheckDialog: false,
        activeContact: null,
      }
    }

    default:
      return state
  }
}
