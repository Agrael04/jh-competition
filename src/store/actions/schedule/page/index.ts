import { createAction } from 'typesafe-actions'
import { Moment } from 'moment'

interface IFilters {
  date: Moment
  gym: { link: string } | null
  resources: string[]
}

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
  'schedule/page/OPEN_CHECK_DIALOG'
)()

export const startFilterUpdate = createAction(
  'schedule/page/START_FILTER_UPDATE'
)()

export const cancelFilterUpdate = createAction(
  'schedule/page/CANCEL_FILTER_UPDATE'
)()

export const completeFilterUpdate = createAction(
  'schedule/page/COMPLETE_FILTER_UPDATE',
  (filters: IFilters) => ({ filters })
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

  startFilterUpdate,
  cancelFilterUpdate,
  completeFilterUpdate,
}

export default actions
