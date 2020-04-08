import constants from 'store/constants/schedule/training-dialog'

import { ITrainingRecord, ITrainingForm } from 'interfaces/training'

export const open = (mode: string, training: Partial<ITrainingForm>, records: ITrainingRecord[]) => ({
  type: constants.OPEN,
  payload: { mode, training, records },
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

export const actions = {
  open,
  close,

  updateField,
  addRecord,
  updateRecordField,
  removeRecord,
}

export default actions
