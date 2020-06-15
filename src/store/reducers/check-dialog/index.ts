import constants from 'store/constants/check-dialog'

import { ITrainingRecordForm } from 'interfaces/training'
import { IPaymentForm } from 'interfaces/payment'
import { ICheckPositionForm } from 'interfaces/check-position'

export interface IState {
  opened: boolean
  contact: string | null

  recordForm: Partial<ITrainingRecordForm> | null
  recordMode: 'update' | null

  positionForm: ICheckPositionForm | null
  positionMode: 'create' | 'update' | null

  paymentForm: IPaymentForm | null
  paymentMode: 'create' | 'update' | null

  openedPassForm: boolean
}

const initialState: IState = {
  opened: false,
  contact: null,

  recordForm: null,
  recordMode: null,

  positionForm: null,
  positionMode: null,

  paymentForm: null,
  paymentMode: null,

  openedPassForm: false,
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

    case constants.CLOSE: {
      return {
        ...state,
        ...initialState,
      }
    }

    case constants.SET_RECORD: {
      return {
        ...state,
        recordForm: payload.record,
        recordMode: payload.mode,
      }
    }

    case constants.RESET_RECORD: {
      return {
        ...state,
        recordForm: null,
        recordMode: null,
      }
    }

    case constants.UPDATE_RECORD: {
      return {
        ...state,
        recordForm: {
          ...state.recordForm,
          ...payload.record,
        },
      }
    }

    case constants.SET_POSITION: {
      return {
        ...state,
        positionForm: payload.position,
        positionMode: payload.mode,
      }
    }

    case constants.RESET_POSITION: {
      return {
        ...state,
        positionForm: null,
        positionMode: null,
      }
    }

    case constants.UPDATE_POSITION: {
      return {
        ...state,
        positionForm: {
          ...state.positionForm,
          ...payload.position,
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

    case constants.OPEN_PASS: {
      return {
        ...state,
        openedPassForm: true,
      }
    }

    case constants.CLOSE_PASS: {
      return {
        ...state,
        openedPassForm: false,
      }
    }

    default:
      return state
  }
}
