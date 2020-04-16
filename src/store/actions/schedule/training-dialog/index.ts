import constants from 'store/constants/schedule/training-dialog'

import { ITrainingRecord, ITrainingForm, ITrainingResourceForm } from 'interfaces/training'

export const open = (mode: string, _id: string) => ({
  type: constants.OPEN,
  payload: { mode, _id },
})

export const initialize = (training: Partial<ITrainingForm>, records: ITrainingRecord[], resources: Array<Partial<ITrainingResourceForm>>) => ({
  type: constants.INITIALIZE,
  payload: { training, records, resources },
})

export const close = () => ({
  type: constants.CLOSE,
  payload: null,
})

export const updateField = (field: string, value: any) => ({
  type: constants.UPDATE_FIELD,
  payload: { field, value },
})

export const addRecord = () => ({
  type: constants.ADD_RECORD,
})

export const updateRecordField = (index: number, field: string, value: any) => ({
  type: constants.UPDATE_RECORD_FIELD,
  payload: { index, field, value },
})

export const removeRecord = (index: number) => ({
  type: constants.REMOVE_RECORD,
  payload: { index },
})

export const openResource = (_id?: string) => ({
  type: constants.OPEN_RESOURCE,
  payload: { _id },
})

export const setResource = (resource: ITrainingResourceForm | null, mode: 'create' | 'update' | null) => ({
  type: constants.SET_RESOURCE,
  payload: { resource, mode },
})

export const updateResourceField = (field: string, value: any) => ({
  type: constants.UPDATE_RESOURCE_FIELD,
  payload: { field, value },
})

export const saveResource = () => ({
  type: constants.SAVE_RESOURCE,
})

export const removeResource = (_id: number) => ({
  type: constants.REMOVE_RESOURCE,
  payload: { _id },
})

export const actions = {
  open,
  initialize,
  close,

  updateField,

  addRecord,
  updateRecordField,
  removeRecord,

  openResource,
  setResource,
  updateResourceField,
  saveResource,
  removeResource,
}

export default actions
