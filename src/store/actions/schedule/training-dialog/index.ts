import constants from 'store/constants/schedule/training-dialog'

import { ITrainingForm, ITrainingResourceForm, ITrainingRecordForm } from 'interfaces/training'

export const open = (mode: string, _id: string) => ({
  type: constants.OPEN,
  payload: { mode, _id },
})

export const initialize = (training: Partial<ITrainingForm>, resource?: Partial<ITrainingResourceForm>) => ({
  type: constants.INITIALIZE,
  payload: { training, resource },
})

export const close = () => ({
  type: constants.CLOSE,
  payload: null,
})

export const updateField = (field: string, value: any) => ({
  type: constants.UPDATE_FIELD,
  payload: { field, value },
})

export const openResource = (resource?: Partial<ITrainingResourceForm>) => ({
  type: constants.OPEN_RESOURCE,
  payload: { resource },
})

export const setResource = (resource: ITrainingResourceForm | null, mode: 'create' | 'update' | null) => ({
  type: constants.SET_RESOURCE,
  payload: { resource, mode },
})

export const resetResource = () => ({
  type: constants.RESET_RESOURCE,
})

export const updateResource = (resource: Partial<ITrainingResourceForm>) => ({
  type: constants.UPDATE_RESOURCE,
  payload: { resource },
})

export const openRecord = (record?: Partial<ITrainingRecordForm>) => ({
  type: constants.OPEN_RECORD,
  payload: { record },
})

export const setRecord = (record: ITrainingRecordForm | null, mode: 'create' | 'update' | null) => ({
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

export const setStep = (step: number) => ({
  type: constants.SET_STEP,
  payload: { step },
})

export const openCheckDialog = () => ({
  type: constants.OPEN_CHECK_DIALOG,
})

export const actions = {
  open,
  initialize,
  close,

  updateField,

  openResource,
  setResource,
  resetResource,
  updateResource,

  openRecord,
  setRecord,
  resetRecord,
  updateRecord,

  setStep,
  openCheckDialog,
}

export default actions
