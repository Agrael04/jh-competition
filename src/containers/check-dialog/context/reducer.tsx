import { ActionType, createReducer } from 'typesafe-actions'
import * as actions from './actions'

import { ITrainingRecordForm } from 'interfaces/training'
import { IPaymentForm } from 'interfaces/payment'
import { ICheckPositionForm } from 'interfaces/check-position'

export interface IReducerState {
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

type Action = ActionType<typeof actions>

const initialState = {
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

export const reducer = createReducer<IReducerState, Action>(initialState)
  .handleType('UPDATE_CONTACT', (state, { payload }) => ({
    ...state,
    params: {
      ...state.params,
      contact: payload.contact,
    },
  }))
  .handleType('UPDATE_DATE', (state, { payload }) => ({
    ...state,
    params: {
      ...state.params,
      activeDate: payload.date,
    },
  }))
  .handleType('OPEN_PASS', state => ({
    ...state,
    openedPassForm: true,
  }))
  .handleType('CLOSE_PASS', state => ({
    ...state,
    openedPassForm: false,
  }))
  .handleType('SET_RECORD', (state, { payload }) => ({
    ...state,
    recordForm: payload.record,
    recordMode: payload.mode,
  }))
  .handleType('RESET_RECORD', state => ({
    ...state,
    recordForm: null,
    recordMode: null,
  }))
  .handleType('UPDATE_RECORD', (state, { payload }) => ({
    ...state,
    recordForm: {
      ...state.recordForm,
      ...payload.record,
    },
  }))
  .handleType('SET_POSITION', (state, { payload }) => ({
    ...state,
    positionForm: payload.position,
    positionMode: payload.mode,
  }))
  .handleType('RESET_POSITION', state => ({
    ...state,
    positionForm: null,
    positionMode: null,
  }))
  .handleType('UPDATE_POSITION', (state, { payload }) => ({
    ...state,
    positionForm: {
      ...state.positionForm,
      ...payload.position,
    },
  }))
  .handleType('SET_PAYMENT', (state, { payload }) => ({
    ...state,
    paymentForm: payload.payment,
    paymentMode: payload.mode,
  }))
  .handleType('RESET_PAYMENT', state => ({
    ...state,
    paymentForm: null,
    paymentMode: null,
  }))
  .handleType('UPDATE_PAYMENT', (state, { payload }) => ({
    ...state,
    paymentForm: {
      ...state.paymentForm,
      ...payload.payment,
    },
  }))
