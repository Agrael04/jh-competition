import constants from 'store/constants/schedule/check-dialog'

import { ITrainingPassForm } from 'interfaces/training-pass'

// import removeTimeFromDate from 'utils/remove-time-from-date'

export interface IState {
  opened: boolean
  contact: string

  passForm: ITrainingPassForm | null
  passMode: 'create' | 'update' | null
}

const initialState: IState = {
  opened: false,
  contact: '5e400c4118499b40fc0ec63a',

  passForm: null,
  passMode: null,
}

export default (state = initialState, { type, payload }: { type: string, payload: any }): IState => {
  switch (type) {
    case constants.OPEN: {
      return {
        ...state,
        opened: true,
        contact: payload.contact,
      }
    }

    // case constants.INITIALIZE: {
    //   return {
    //     ...state,

    //     passForm: payload.pass,
    //     passMode: 'create',
    //   }
    // }

    case constants.CLOSE: {
      return {
        ...state,
        ...initialState,
      }
    }

    case constants.SET_PASS: {
      return {
        ...state,
        passForm: payload.pass,
        passMode: payload.mode,
      }
    }

    case constants.RESET_PASS: {
      return {
        ...state,
        passForm: null,
        passMode: null,
      }
    }

    case constants.UPDATE_PASS: {
      return {
        ...state,
        passForm: {
          ...state.passForm,
          ...payload.pass,
        },
      }
    }

    default:
      return state
  }
}
