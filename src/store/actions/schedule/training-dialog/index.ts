import constants from 'store/constants/schedule/training-dialog'

import { ITrainingForm, ITrainingResourceForm, ITrainingRecordForm } from 'interfaces/training'

export const open = (mode: string, _id: string) => ({
  type: constants.OPEN,
  payload: { mode, _id },
})

export const initialize = (training: Partial<ITrainingForm>, records: Array<Partial<ITrainingRecordForm>>, resources: Array<Partial<ITrainingResourceForm>>) => ({
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

export const removeResource = (_id: string) => ({
  type: constants.REMOVE_RESOURCE,
  payload: { _id },
})

export const openRecord = (_id?: string) => ({
  type: constants.OPEN_RECORD,
  payload: { _id },
})

export const setRecord = (record: ITrainingRecordForm | null, mode: 'create' | 'update' | null) => ({
  type: constants.SET_RECORD,
  payload: { record, mode },
})

export const updateRecordField = (field: string, value: any) => ({
  type: constants.UPDATE_RECORD_FIELD,
  payload: { field, value },
})

export const saveRecord = () => ({
  type: constants.SAVE_RECORD,
})

export const removeRecord = (_id: number) => ({
  type: constants.REMOVE_RECORD,
  payload: { _id },
})

export const actions = {
  open,
  initialize,
  close,

  updateField,

  openResource,
  setResource,
  updateResourceField,
  saveResource,
  removeResource,

  openRecord,
  setRecord,
  updateRecordField,
  saveRecord,
  removeRecord,
}

export default actions
