import { createAction } from 'typesafe-actions'

import { IPaymentForm } from 'interfaces/payment'
import { ITrainingRecordForm } from 'interfaces/training'
import { ICheckPositionForm } from 'interfaces/check-position'

export const openDialog = createAction(
  'checkDialog/OPEN_DIALOG',
  (activeDate: Date, activeGym: string, contact?: string) => ({
    activeDate,
    activeGym,
    contact: contact ? { link: contact } : null,
  })
)()

export const closeDialog = createAction(
  'checkDialog/CLOSE_DIALOG'
)()

export const updateContact = createAction(
  'checkDialog/UPDATE_CONTACT',
  (contact: { link: string } | null) => ({ contact })
)()

export const updateActiveDate = createAction(
  'checkDialog/UPDATE_ACTIVE_DATE',
  (activeDate: Date) => ({ activeDate })
)()

export const openPassForm = createAction(
  'checkDialog/OPEN_PASS'
)()

export const closePassForm = createAction(
  'checkDialog/CLOSE_PASS'
)()

export const setRecord = createAction(
  'checkDialog/SET_RECORD',
  (record: Partial<ITrainingRecordForm> | null, mode: 'update' | null) => ({ record, mode })
)()

export const resetRecord = createAction(
  'checkDialog/RESET_RECORD'
)()

export const updateRecord = createAction(
  'checkDialog/UPDATE_RECORD',
  (record: Partial<ITrainingRecordForm>) => ({ record })
)()

export const setPosition = createAction(
  'checkDialog/SET_POSITION',
  (position: Partial<ICheckPositionForm> | null, mode: 'create' | 'update' | null) => ({ position, mode })
)()

export const resetPosition = createAction(
  'checkDialog/RESET_POSITION'
)()

export const updatePosition = createAction(
  'checkDialog/UPDATE_POSITION',
  (position: Partial<ICheckPositionForm>) => ({ position })
)()

export const setPayment = createAction(
  'checkDialog/SET_PAYMENT',
  (payment: Partial<IPaymentForm> | null, mode: 'create' | 'update' | null) => ({ payment, mode })
)()

export const resetPayment = createAction(
  'checkDialog/RESET_PAYMENT'
)()

export const updatePayment = createAction(
  'checkDialog/UPDATE_PAYMENT',
  (payment: Partial<IPaymentForm>) => ({ payment })
)()

export const actions = {
  openDialog,
  closeDialog,

  updateContact,
  updateActiveDate,

  openPassForm,
  closePassForm,

  setRecord,
  resetRecord,
  updateRecord,

  setPosition,
  resetPosition,
  updatePosition,

  setPayment,
  resetPayment,
  updatePayment,
}

export default actions
