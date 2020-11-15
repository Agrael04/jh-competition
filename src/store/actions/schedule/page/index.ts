import { createAction } from 'typesafe-actions'
import { Moment } from 'moment'

interface IFilters {
  date: Moment
  gym: string
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

export const setActiveTime = createAction(
  'schedule/page/SET_ACTIVE_TIME',
  (time: number) => ({ time })
)()


export const openCheckDialog = createAction(
  'schedule/page/OPEN_CHECK_DIALOG'
)()

export const startFiltersUpdate = createAction(
  'schedule/page/START_FILTERS_UPDATE'
)()

export const cancelFiltersUpdate = createAction(
  'schedule/page/CANCEL_FILTERS_UPDATE'
)()

export const setFilters = createAction(
  'schedule/page/SET_FILTERS',
  (filters: Partial<IFilters>) => ({ filters })
)()

export const completeFiltersUpdate = createAction(
  'schedule/page/COMPLETE_FILTERS_UPDATE',
  (filters: IFilters) => ({ filters })
)()

export const actions = {
  openCreateTrainingDialog,
  openUpdateTrainingDialog,

  openAddTrainerDialog,

  checkActiveTime,

  setActiveTime,

  openCheckDialog,

  startFiltersUpdate,
  cancelFiltersUpdate,
  setFilters,
  completeFiltersUpdate,
}

export default actions
