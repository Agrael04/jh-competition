import { ActionType, createReducer } from 'typesafe-actions'
import actions from 'store/actions/check-dialog'

import { IPaymentForm } from 'interfaces/payment'
import { ICheckPositionForm } from 'interfaces/check-position'

import removeTimeFromDate from 'utils/remove-time-from-date'

type IAction = ActionType<typeof actions>

const currentDate = removeTimeFromDate(new Date())!

export interface IState {
  opened: boolean
  params: {
    activeDate: Date
    activeGym: string
    contact: {
      link: string
    } | null
  }

  positionForm: {
    isActive: boolean
    mode: 'create' | 'update' | null
    position: Partial<ICheckPositionForm> | null
  }

  paymentForm: {
    isActive: boolean
    mode: 'create' | 'update' | null
    payment: Partial<IPaymentForm> | null
  }

  openedPassForm: boolean
}

const initialState = {
  opened: false,
  params: {
    activeDate: new Date(),
    activeGym: '',
    contact: null,
  },

  positionForm: {
    isActive: false,
    mode: null,
    position: null,
  },

  paymentForm: {
    isActive: false,
    mode: null,
    payment: null,
  },

  openedPassForm: false,
}

const reducer = createReducer<IState, IAction>(initialState)
  .handleAction(actions.openDialog, (state, { payload: { activeDate, activeGym, contact } }) => ({
    ...state,
    opened: true,
    params: {
      activeDate,
      activeGym,
      contact,
    },
  }))
  .handleAction(actions.closeDialog, state => ({
    ...state,
    ...initialState,
  }))
  .handleAction(actions.updateContact, (state, { payload: { contact } }) => ({
    ...state,
    params: {
      ...state.params,
      contact,
    },
  }))
  .handleAction(actions.updateActiveDate, (state, { payload: { activeDate } }) => ({
    ...state,
    params: {
      ...state.params,
      activeDate,
    },
  }))
  .handleAction(actions.openPassForm, state => ({
    ...state,
    openedPassForm: true,
  }))
  .handleAction(actions.closePassForm, state => ({
    ...state,
    openedPassForm: false,
  }))
  .handleAction(actions.openCreatePositionForm, (state, { payload: { position } }) => ({
    ...state,
    positionForm: {
      position: {
        contact: state.params.contact!,
        date: state.params.activeDate,
        type: position?.type,
        service: position?.service,
        priceAmount: null,
        priceType: 'money',
      },
      mode: 'create',
      isActive: true,
    },
  }))
  .handleAction(actions.openUpdatePositionForm, (state, { payload: { position } }) => ({
    ...state,
    positionForm: {
      position: {
        _id: position._id,
        priceType: position.priceType || 'money',
        priceAmount: position.priceAmount,
        type: position.type,
        service: position.service,
      },
      mode: 'update',
      isActive: true,
    },
  }))
  .handleAction(actions.closePositionForm, state => ({
    ...state,
    positionForm: initialState.positionForm,
  }))
  .handleAction(actions.openCreatePaymentForm, state => ({
    ...state,
    paymentForm: {
      payment: {
        contact: state.params.contact!,
        gym: { link: state.params.activeGym },
        date: state.params.activeDate,
        createdAt: currentDate,
        type: 'units',
        amount: null,
      },
      mode: 'create',
      isActive: true,
    },
  }))
  .handleAction(actions.openUpdatePaymentForm, (state, { payload: { payment } }) => ({
    ...state,
    paymentForm: {
      payment: {
        _id: payment._id,
        type: payment.type,
        pass: payment.pass,
        amount: payment.amount,
        destination: payment.destination,
        transaction: payment.transaction,
      },
      mode: 'update',
      isActive: true,
    },
  }))
  .handleAction(actions.closePaymentForm, state => ({
    ...state,
    paymentForm: initialState.paymentForm,
  }))

export default reducer
