import { createAction } from 'typesafe-actions'

import { ITrainingResourceForm, ITrainingRecordForm } from 'interfaces/training'

import ITrainingForm from 'routes/schedule/training-dialog/training-step/training-form/form'

export const open = createAction(
  'schedule/trainingDialog/OPEN',
  (mode: 'create' | 'update', _id: string) => ({ mode, _id })
)()

export const initialize = createAction(
  'schedule/trainingDialog/INITIALIZE',
  (training: ITrainingForm) => ({ training })
)()

export const close = createAction(
  'schedule/trainingDialog/CLOSE'
)()

export const openCreateResourceForm = createAction(
  'schedule/trainingDialog/OPEN_CREATE_RESOURCE_FORM',
  (resource?: Partial<ITrainingResourceForm>) => ({ resource })
)()

export const openUpdateResourceForm = createAction(
  'schedule/trainingDialog/OPEN_UPDATE_RESOURCE_FORM',
  (resource: Partial<ITrainingResourceForm>) => ({ resource })
)()

export const closeResource = createAction(
  'schedule/trainingDialog/CLOSE_RESOURCE'
)()

export const openCreateRecordForm = createAction(
  'schedule/trainingDialog/OPEN_CREATE_RECORD_FORM',
  (record?: Partial<ITrainingRecordForm>) => ({ record })
)()

export const openUpdateRecordForm = createAction(
  'schedule/trainingDialog/OPEN_UPDATE_RECORD_FORM',
  (record: Partial<ITrainingRecordForm>) => ({ record })
)()

export const closeRecord = createAction(
  'schedule/trainingDialog/CLOSE_RECORD'
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

  openCreateResourceForm,
  openUpdateResourceForm,
  closeResource,

  openCreateRecordForm,
  openUpdateRecordForm,
  closeRecord,

  setStep,
  openCheckDialog,
}

export default actions
