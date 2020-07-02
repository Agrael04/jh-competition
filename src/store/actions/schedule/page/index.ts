import { createAction } from 'typesafe-actions'

export const openCreateTrainingDialog = createAction(
  'schedule/page/OPEN_CREATE_TRAINING_DIALOG',
  (resource: string, time: number) => ({ resource, time })
)()

export const openUpdateTrainingDialog = createAction(
  'schedule/page/OPEN_UPDATE_TRAINING_DIALOG',
  (_id: string) => ({ _id })
)()

export const openAddTrainerDialog = createAction(
  'schedule/page/OPEN_ADD_TRAINER_DIALOG'
)()

export const checkActiveTime = createAction(
  'schedule/page/CHECK_ACTIVE_TIME'
)()

export const setActiveDate = createAction(
  'schedule/page/SET_ACTIVE_DATE',
  (date: Date) => ({ date })
)()

export const setActiveGym = createAction(
  'schedule/page/SET_ACTIVE_GYM',
  (gym: string, resources: string[]) => ({ gym, resources })
)()

export const setActiveResources = createAction(
  'schedule/page/SET_ACTIVE_RESOURCES',
  (resources: string[]) => ({ resources })
)()

export const setActiveTime = createAction(
  'schedule/page/SET_ACTIVE_TIME',
  (time: number) => ({ time })
)()

export const toggleOpenedTrainers = createAction(
  'schedule/page/TOGGLE_OPENED_TRAINERS'
)()

export const openCheckDialog = createAction(
  'schedule/page/OPEN_CHECK_DIALOG',
  (contact?: string) => ({ contact: contact || null })
)()

export const closeCheckDialog = createAction(
  'schedule/page/CLOSE_CHECK_DIALOG'
)()

export const actions = {
  openCreateTrainingDialog,
  openUpdateTrainingDialog,

  openAddTrainerDialog,

  checkActiveTime,

  setActiveDate,
  setActiveGym,
  setActiveResources,
  setActiveTime,

  toggleOpenedTrainers,
  openCheckDialog,
  closeCheckDialog,
}

export default actions
