import { IPaymentForm } from 'interfaces/payment'
import { ITrainingRecordForm } from 'interfaces/training'
import { ICheckPositionForm } from 'interfaces/check-position'

export const updateContact = (contact: { link: string } | null) => ({
  type: 'UPDATE_CONTACT' as const,
  payload: { contact },
})

export const updateActiveDate = (date: Date) => ({
  type: 'UPDATE_DATE' as const,
  payload: { date },
})

export const openPassForm = () => ({
  type: 'OPEN_PASS' as const,
})

export const closePassForm = () => ({
  type: 'CLOSE_PASS' as const,
})

export const setRecord = (record: Partial<ITrainingRecordForm> | null, mode: 'update' | null) => ({
  type: 'SET_RECORD' as const,
  payload: { record, mode },
})

export const resetRecord = () => ({
  type: 'RESET_RECORD' as const,
})

export const updateRecord = (record: Partial<ITrainingRecordForm>) => ({
  type: 'UPDATE_RECORD' as const,
  payload: { record },
})

export const setPosition = (position: Partial<ICheckPositionForm> | null, mode: 'create' | 'update' | null) => ({
  type: 'SET_POSITION' as const,
  payload: { position, mode },
})

export const resetPosition = () => ({
  type: 'RESET_POSITION' as const,
})

export const updatePosition = (position: Partial<ICheckPositionForm>) => ({
  type: 'UPDATE_POSITION' as const,
  payload: { position },
})

export const setPayment = (payment: Partial<IPaymentForm> | null, mode: 'create' | 'update' | null) => ({
  type: 'SET_PAYMENT' as const,
  payload: { payment, mode },
})

export const resetPayment = () => ({
  type: 'RESET_PAYMENT' as const,
})

export const updatePayment = (payment: Partial<IPaymentForm>) => ({
  type: 'UPDATE_PAYMENT' as const,
  payload: { payment },
})
