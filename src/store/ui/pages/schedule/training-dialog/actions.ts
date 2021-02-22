import { createAction } from 'typesafe-actions'

import ITrainingForm from 'routes/schedule/training-dialog/training-form/form'
import IRecordForm from 'routes/schedule/training-dialog/records-step/record-form/form'

export const open = createAction(
  '@ui/pages/schedule/trainingDialog/OPEN',
  (_id?: string) => ({ _id })
)()

export const close = createAction(
  '@ui/pages/schedule/trainingDialog/CLOSE'
)()

export const openCreateTrainingForm = createAction(
  '@ui/pages/schedule/trainingDialog/OPEN_CREATE_TRAINING_FORM',
  (defaultValues?: Partial<ITrainingForm>) => ({ defaultValues })
)()

export const openUpdateTrainingForm = createAction(
  '@ui/pages/schedule/trainingDialog/OPEN_UPDATE_TRAINING_FORM',
  (_id: string, defaultValues: Partial<ITrainingForm>) => ({ _id, defaultValues })
)()

export const closeTraining = createAction(
  '@ui/pages/schedule/trainingDialog/CLOSE_TRAINING'
)()

// export const openCreateResourceForm = createAction(
//   '@ui/pages/schedule/trainingDialog/OPEN_CREATE_RESOURCE_FORM',
//   (defaultValues?: Partial<ITrainingForm>) => ({ defaultValues })
// )()

// export const openUpdateResourceForm = createAction(
//   '@ui/pages/schedule/trainingDialog/OPEN_UPDATE_RESOURCE_FORM',
//   (_id: string, defaultValues: Partial<ITrainingForm>) => ({ _id, defaultValues })
// )()

// export const closeResource = createAction(
//   '@ui/pages/schedule/trainingDialog/CLOSE_RESOURCE'
// )()

export const openCreateRecordForm = createAction(
  '@ui/pages/schedule/trainingDialog/OPEN_CREATE_RECORD_FORM',
  (defaultValues?: Partial<IRecordForm>) => ({ defaultValues })
)()

export const openUpdateRecordForm = createAction(
  '@ui/pages/schedule/trainingDialog/OPEN_UPDATE_RECORD_FORM',
  (_id: string, defaultValues: Partial<IRecordForm>) => ({ _id, defaultValues })
)()

export const closeRecord = createAction(
  '@ui/pages/schedule/trainingDialog/CLOSE_RECORD'
)()

export const setStep = createAction(
  '@ui/pages/schedule/trainingDialog/SET_STEP',
  (step: number) => ({ step })
)()

export const setTrainingId = createAction(
  '@ui/pages/schedule/trainingDialog/SET_TRAINING_ID',
  (_id: string) => ({ _id })
)()

export const openCheckDialog = createAction(
  '@ui/pages/schedule/trainingDialog/OPEN_CHECK_DIALOG',
  (contact: string) => ({ contact })
)()

export const actions = {
  open,
  close,

  openCreateTrainingForm,
  openUpdateTrainingForm,
  closeTraining,

  // openCreateResourceForm,
  // openUpdateResourceForm,
  // closeResource,

  openCreateRecordForm,
  openUpdateRecordForm,
  closeRecord,

  setStep,
  setTrainingId,
  openCheckDialog,
}

export default actions
