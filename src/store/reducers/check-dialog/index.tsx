import { ActionType, createReducer } from 'typesafe-actions'
import actions from 'store/actions/check-dialog'

import { ITrainingRecordForm } from 'interfaces/training'
import { IPaymentForm } from 'interfaces/payment'
import { ICheckPositionForm } from 'interfaces/check-position'

type IAction = ActionType<typeof actions>

export interface IState {
  opened: boolean
  params: {
    activeDate: Date
    activeGym: string
    contact: {
      link: string
    } | null
  }

  recordForm: Partial<ITrainingRecordForm> | null
  recordMode: 'update' | null

  positionForm: Partial<ICheckPositionForm> | null
  positionMode: 'create' | 'update' | null

  paymentForm: Partial<IPaymentForm> | null
  paymentMode: 'create' | 'update' | null

  openedPassForm: boolean
}

const initialState = {
  opened: false,
  params: {
    activeDate: new Date(),
    activeGym: '',
    contact: null,
  },

  recordForm: null,
  recordMode: null,

  positionForm: null,
  positionMode: null,

  paymentForm: null,
  paymentMode: null,

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
  .handleAction(actions.setRecord, (state, { payload: { record, mode } }) => ({
    ...state,
    recordForm: record,
    recordMode: mode,
  }))
  .handleAction(actions.resetRecord, state => ({
    ...state,
    recordForm: null,
    recordMode: null,
  }))
  .handleAction(actions.updateRecord, (state, { payload: { record } }) => ({
    ...state,
    recordForm: {
      ...state.recordForm,
      ...record,
    },
  }))
  .handleAction(actions.setPosition, (state, { payload: { position, mode } }) => ({
    ...state,
    positionForm: position,
    positionMode: mode,
  }))
  .handleAction(actions.resetPosition, state => ({
    ...state,
    positionForm: null,
    positionMode: null,
  }))
  .handleAction(actions.updatePosition, (state, { payload: { position } }) => ({
    ...state,
    positionForm: {
      ...state.positionForm,
      ...position,
    },
  }))
  .handleAction(actions.setPayment, (state, { payload: { payment, mode } }) => ({
    ...state,
    paymentForm: payment,
    paymentMode: mode,
  }))
  .handleAction(actions.resetPayment, state => ({
    ...state,
    paymentForm: null,
    paymentMode: null,
  }))
  .handleAction(actions.updatePayment, (state, { payload: { payment } }) => ({
    ...state,
    paymentForm: {
      ...state.paymentForm,
      ...payment,
    },
  }))

export default reducer
