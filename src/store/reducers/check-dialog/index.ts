import constants from 'store/constants/check-dialog'

import { ITrainingPassForm } from 'interfaces/training-pass'
import { IPaymentForm } from 'interfaces/payment'

// import removeTimeFromDate from 'utils/remove-time-from-date'

export interface IState {
  opened: boolean
  contact: string | null

  passForm: ITrainingPassForm | null
  passMode: 'create' | 'update' | null

  paymentForm: IPaymentForm | null
  paymentMode: 'create' | 'update' | null
}

const initialState: IState = {
  opened: false,
  contact: null,

  passForm: null,
  passMode: null,

  paymentForm: null,
  paymentMode: null,
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

    case constants.SET_PAYMENT: {
      return {
        ...state,
        paymentForm: payload.payment,
        paymentMode: payload.mode,
      }
    }

    case constants.RESET_PAYMENT: {
      return {
        ...state,
        paymentForm: null,
        paymentMode: null,
      }
    }

    case constants.UPDATE_PAYMENT: {
      return {
        ...state,
        paymentForm: {
          ...state.paymentForm,
          ...payload.payment,
        },
      }
    }

    default:
      return state
  }
}
