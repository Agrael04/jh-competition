import { createAction } from 'typesafe-actions'

import { ITrainingForm, ITrainingResourceForm, ITrainingRecordForm } from 'interfaces/training'

export const open = createAction(
  'schedule/trainingDialog/OPEN',
  (mode: 'create' | 'update', _id: string) => ({ mode, _id })
)()

export const initialize = createAction(
  'schedule/trainingDialog/INITIALIZE',
  (training: Partial<ITrainingForm>) => ({ training })
)()

export const close = createAction(
  'schedule/trainingDialog/CLOSE'
)()

export const updateField = createAction(
  'schedule/trainingDialog/UPDATE_FIELD',
  (field: string, value: any) => ({ field, value })
)()

export const openResource = createAction(
  'schedule/trainingDialog/OPEN_RESOURCE',
  (resource?: Partial<ITrainingResourceForm>) => ({ resource })
)()

export const setResource = createAction(
  'schedule/trainingDialog/SET_RESOURCE',
  (resource: ITrainingResourceForm | null, mode: 'create' | 'update' | null) => ({ resource, mode })
)()

export const resetResource = createAction(
  'schedule/trainingDialog/RESET_RESOURCE'
)()

export const updateResource = createAction(
  'schedule/trainingDialog/UPDATE_RESOURCE',
  (resource: Partial<ITrainingResourceForm>) => ({ resource })
)()

export const openRecord = createAction(
  'schedule/trainingDialog/OPEN_RECORD',
  (record?: Partial<ITrainingRecordForm>) => ({ record })
)()

export const setRecord = createAction(
  'schedule/trainingDialog/SET_RECORD',
  (record: ITrainingRecordForm | null, mode: 'create' | 'update' | null) => ({ record, mode })
)()

export const resetRecord = createAction(
  'schedule/trainingDialog/RESET_RECORD'
)()

export const updateRecord = createAction(
  'schedule/trainingDialog/UPDATE_RECORD',
  (record: Partial<ITrainingRecordForm>) => ({ record })
)()

export const setStep = createAction(
  'schedule/trainingDialog/SET_STEP',
  (step: number) => ({ step })
)()

export const openCheckDialog = createAction(
  'schedule/trainingDialog/OPEN_CHECK_DIALOG'
)()

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
