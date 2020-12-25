import { createAction } from 'typesafe-actions'
import { Moment } from 'moment'

import { ITrainingPassForm } from 'interfaces/training-pass'
import IPositionForm from 'containers/check-dialog/positions-block/position-form/form'
import IPaymentForm from 'containers/check-dialog/payments-block/payment-form/form'

export const openDialog = createAction(
  '@ui/dialog/checkDialog/OPEN_DIALOG',
  (activeDate: Moment, activeGym: string, contact?: string) => ({
    activeDate,
    activeGym,
    contact: contact ? { link: contact } : null,
  })
)()

export const closeDialog = createAction(
  '@ui/dialog/checkDialog/CLOSE_DIALOG'
)()

export const updateContact = createAction(
  '@ui/dialog/checkDialog/UPDATE_CONTACT',
  (contact: { link: string } | null) => ({ contact })
)()

export const updateActiveDate = createAction(
  '@ui/dialog/checkDialog/UPDATE_ACTIVE_DATE',
  (activeDate: Moment) => ({ activeDate })
)()

export const openCreatePositionForm = createAction(
  '@ui/dialog/checkDialog/OPEN_CREATE_POSITION_FORM',
  (defaultValues?: Partial<IPositionForm>) => ({ defaultValues })
)()

export const openUpdatePositionForm = createAction(
  '@ui/dialog/checkDialog/OPEN_UPDATE_POSITION_FORM',
  (_id: string, defaultValues: Partial<IPositionForm>) => ({ _id, defaultValues })
)()

export const closePositionForm = createAction(
  '@ui/dialog/checkDialog/CLOSE_POSITION_FORM'
)()

export const openCreatePaymentForm = createAction(
  '@ui/dialog/checkDialog/OPEN_CREATE_PAYMENT_FORM',
  (defaultValues?: Partial<IPaymentForm>) => ({ defaultValues })
)()

export const openUpdatePaymentForm = createAction(
  '@ui/dialog/checkDialog/OPEN_UPDATE_PAYMENT_FORM',
  (_id: string, defaultValues: Partial<IPaymentForm>) => ({ _id, defaultValues })
)()

export const closePaymentForm = createAction(
  '@ui/dialog/checkDialog/CLOSE_PAYMENT_FORM'
)()

export const openCreatePassForm = createAction(
  '@ui/dialog/checkDialog/OPEN_CREATE_PASS_PASS',
  (defaultValues?: Partial<ITrainingPassForm>) => ({ defaultValues })
)()

export const closePassForm = createAction(
  '@ui/dialog/checkDialog/CLOSE_PASS'
)()

export const actions = {
  openDialog,
  closeDialog,

  updateContact,
  updateActiveDate,

  openCreatePositionForm,
  openUpdatePositionForm,
  closePositionForm,

  openCreatePaymentForm,
  openUpdatePaymentForm,
  closePaymentForm,

  openCreatePassForm,
  closePassForm,
}

export default actions
