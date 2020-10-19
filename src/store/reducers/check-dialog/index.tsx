import { ActionType, createReducer } from 'typesafe-actions'
import actions from 'store/actions/check-dialog'
import moment, { Moment } from 'moment'

import { IPositionForm } from 'containers/check-dialog/positions-block/position-form'
import { IPaymentForm } from 'containers/check-dialog/payments-block/payment-form'
import { ITrainingPassForm } from 'interfaces/training-pass'

type IAction = ActionType<typeof actions>

export interface IState {
  opened: boolean
  params: {
    activeDate: Moment
    activeGym: string
    contact: {
      link: string
    } | null
  }

  positionForm: {
    active: boolean
    _id: string | null
    defaultValues: Partial<IPositionForm> | null
  }

  paymentForm: {
    active: boolean
    _id: string | null
    defaultValues: IPaymentForm | null
  }

  passForm: {
    active: boolean
    _id: string | null
    defaultValues: ITrainingPassForm | null
  }
}

const initialState = {
  opened: false,
  params: {
    activeDate: moment().startOf('day'),
    activeGym: '',
    contact: null,
  },

  positionForm: {
    active: false,
    _id: null,
    defaultValues: null,
  },

  paymentForm: {
    active: false,
    _id: null,
    defaultValues: null,
  },

  passForm: {
    active: false,
    _id: null,
    defaultValues: null,
  },
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
  .handleAction(actions.openPassForm, (state, { payload: { defaultValues } }) => ({
    ...state,
    passForm: {
      active: true,
      _id: null,
      defaultValues: {
        contact: state.params.contact,
        createdAt: state.params.activeDate,
        isActive: false,
        ...defaultValues,
      },
    },
  }))
  .handleAction(actions.closePassForm, state => ({
    ...state,
    passForm: initialState.passForm,
  }))
  .handleAction(actions.openPositionForm, (state, { payload: { _id, defaultValues } }) => ({
    ...state,
    positionForm: {
      active: true,
      _id,
      defaultValues,
    },
  }))
  .handleAction(actions.closePositionForm, state => ({
    ...state,
    positionForm: initialState.positionForm,
  }))
  .handleAction(actions.openPaymentForm, (state, { payload: { _id, defaultValues } }) => ({
    ...state,
    paymentForm: {
      active: true,
      _id,
      defaultValues,
    },
  }))
  .handleAction(actions.closePaymentForm, state => ({
    ...state,
    paymentForm: initialState.paymentForm,
  }))

export default reducer
