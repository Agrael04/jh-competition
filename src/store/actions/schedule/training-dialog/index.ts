import { createAction } from 'typesafe-actions'

import ITrainingForm from 'routes/schedule/training-dialog/training-step/training-form/form'
import IResourceForm from 'routes/schedule/training-dialog/resources-step/resource-form/form'
import IRecordForm from 'routes/schedule/training-dialog/records-step/record-form/form'

export const open = createAction(
  'schedule/trainingDialog/OPEN',
  (_id?: string) => ({ _id })
)()

export const close = createAction(
  'schedule/trainingDialog/CLOSE'
)()

export const openCreateTrainingForm = createAction(
  'schedule/trainingDialog/OPEN_CREATE_TRAINING_FORM',
  (defaultValues?: Partial<ITrainingForm>) => ({ defaultValues })
)()

export const openUpdateTrainingForm = createAction(
  'schedule/trainingDialog/OPEN_UPDATE_TRAINING_FORM',
  (_id: string, defaultValues: Partial<ITrainingForm>) => ({ _id, defaultValues })
)()

export const closeTraining = createAction(
  'schedule/trainingDialog/CLOSE_TRAINING'
)()

export const openCreateResourceForm = createAction(
  'schedule/trainingDialog/OPEN_CREATE_RESOURCE_FORM',
  (defaultValues?: Partial<IResourceForm>) => ({ defaultValues })
)()

export const openUpdateResourceForm = createAction(
  'schedule/trainingDialog/OPEN_UPDATE_RESOURCE_FORM',
  (_id: string, defaultValues: Partial<IResourceForm>) => ({ _id, defaultValues })
)()

export const closeResource = createAction(
  'schedule/trainingDialog/CLOSE_RESOURCE'
)()

export const openCreateRecordForm = createAction(
  'schedule/trainingDialog/OPEN_CREATE_RECORD_FORM',
  (defaultValues?: Partial<IRecordForm>) => ({ defaultValues })
)()

export const openUpdateRecordForm = createAction(
  'schedule/trainingDialog/OPEN_UPDATE_RECORD_FORM',
  (_id: string, defaultValues: Partial<IRecordForm>) => ({ _id, defaultValues })
)()

export const closeRecord = createAction(
  'schedule/trainingDialog/CLOSE_RECORD'
)()

export const setStep = createAction(
  'schedule/trainingDialog/SET_STEP',
  (step: number) => ({ step })
)()

export const setTrainingId = createAction(
  'schedule/trainingDialog/SET_TRAINING_ID',
  (_id: string) => ({ _id })
)()

export const openCheckDialog = createAction(
  'schedule/trainingDialog/OPEN_CHECK_DIALOG'
)()

export const actions = {
  open,
  close,

  openCreateTrainingForm,
  openUpdateTrainingForm,
  closeTraining,

  openCreateResourceForm,
  openUpdateResourceForm,
  closeResource,

  openCreateRecordForm,
  openUpdateRecordForm,
  closeRecord,

  setStep,
  setTrainingId,
  openCheckDialog,
}

export default actions
