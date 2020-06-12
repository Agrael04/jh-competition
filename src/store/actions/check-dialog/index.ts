import constants from 'store/constants/check-dialog'

import { ITrainingPassForm } from 'interfaces/training-pass'
import { IPaymentForm } from 'interfaces/payment'
import { ITrainingRecordForm } from 'interfaces/training'
import { IServiceForm } from 'interfaces/service'

export const open = (contact: string) => ({
  type: constants.OPEN,
  payload: { contact },
})

export const initialize = (pass: Partial<ITrainingPassForm>) => ({
  type: constants.INITIALIZE,
  payload: { pass },
})

export const close = () => ({
  type: constants.CLOSE,
  payload: null,
})

export const openRecord = (record: Partial<ITrainingRecordForm>) => ({
  type: constants.OPEN_RECORD,
  payload: { record },
})

export const setRecord = (record: Partial<ITrainingRecordForm> | null, mode: 'create' | 'update' | null) => ({
  type: constants.SET_RECORD,
  payload: { record, mode },
})

export const resetRecord = () => ({
  type: constants.RESET_RECORD,
})

export const updateRecord = (record: Partial<ITrainingRecordForm>) => ({
  type: constants.UPDATE_RECORD,
  payload: { record },
})

export const openService = (service?: Partial<IServiceForm>) => ({
  type: constants.OPEN_SERVICE,
  payload: { service },
})

export const setService = (service: Partial<IServiceForm> | null, mode: 'create' | 'update' | null) => ({
  type: constants.SET_SERVICE,
  payload: { service, mode },
})

export const resetService = () => ({
  type: constants.RESET_SERVICE,
})

export const updateService = (service: Partial<IServiceForm>) => ({
  type: constants.UPDATE_SERVICE,
  payload: { service },
})

export const openPayment = (payment?: Partial<IPaymentForm>) => ({
  type: constants.OPEN_PAYMENT,
  payload: { payment },
})

export const setPayment = (payment: Partial<IPaymentForm> | null, mode: 'create' | 'update' | null) => ({
  type: constants.SET_PAYMENT,
  payload: { payment, mode },
})

export const resetPayment = () => ({
  type: constants.RESET_PAYMENT,
})

export const updatePayment = (payment: Partial<IPaymentForm>) => ({
  type: constants.UPDATE_PAYMENT,
  payload: { payment },
})

export const openPass = (initialFilter: string) => ({
  type: constants.OPEN_PASS,
  payload: { initialFilter },
})

export const actions = {
  open,
  initialize,
  close,

  openRecord,
  setRecord,
  resetRecord,
  updateRecord,

  openService,
  setService,
  resetService,
  updateService,

  openPayment,
  setPayment,
  resetPayment,
  updatePayment,

  openPass,
}

export default actions
