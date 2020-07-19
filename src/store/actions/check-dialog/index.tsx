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

export const openUpdateRecordForm = createAction(
  'checkDialog/OPEN_UPDATE_RECORD_FORM',
  (record: Partial<ITrainingRecordForm>) => ({ record })
)()

export const closeRecordForm = createAction(
  'checkDialog/CLOSE_RECORD_FORM'
)()

export const openCreatePositionForm = createAction(
  'checkDialog/OPEN_CREATE_POSITION_FORM'
)()

export const openUpdatePositionForm = createAction(
  'checkDialog/OPEN_UPDATE_POSITION_FORM',
  (position: Partial<ICheckPositionForm>) => ({ position })
)()

export const closePositionForm = createAction(
  'checkDialog/CLOSE_POSITION_FORM'
)()

export const openCreatePaymentForm = createAction(
  'checkDialog/OPEN_CREATE_PAYMENT_FORM'
)()

export const openUpdatePaymentForm = createAction(
  'checkDialog/OPEN_UPDATE_PAYMENT_FORM',
  (payment: Partial<IPaymentForm>) => ({ payment })
)()

export const closePaymentForm = createAction(
  'checkDialog/CLOSE_PAYMENT_FORM'
)()

export const actions = {
  openDialog,
  closeDialog,

  updateContact,
  updateActiveDate,

  openPassForm,
  closePassForm,

  openUpdateRecordForm,
  closeRecordForm,

  openCreatePositionForm,
  openUpdatePositionForm,
  closePositionForm,

  openCreatePaymentForm,
  openUpdatePaymentForm,
  closePaymentForm,
}

export default actions
