import { createAction } from 'typesafe-actions'

import { ITrainingPassForm } from 'interfaces/training-pass'
import { IPositionForm } from 'containers/check-dialog/positions-block/position-form'
import { IPaymentForm } from 'containers/check-dialog/payments-block/payment-form'

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
  'checkDialog/OPEN_PASS',
  (defaultValues?: Partial<ITrainingPassForm>) => ({ defaultValues })
)()

export const closePassForm = createAction(
  'checkDialog/CLOSE_PASS'
)()

export const openPositionForm = createAction(
  'checkDialog/OPEN_POSITION_FORM',
  (_id: string | null = null, defaultValues: Partial<IPositionForm> | null = null) => ({ _id, defaultValues })
)()

export const closePositionForm = createAction(
  'checkDialog/CLOSE_POSITION_FORM'
)()

export const openPaymentForm = createAction(
  'checkDialog/OPEN_PAYMENT_FORM',
  (_id: string | null = null, defaultValues: Partial<IPaymentForm> | null = null) => ({ _id, defaultValues })
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

  openPositionForm,
  closePositionForm,

  openPaymentForm,
  closePaymentForm,
}

export default actions
