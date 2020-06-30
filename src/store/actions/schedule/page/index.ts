import constants from 'store/constants/schedule/page'

export const openCreateTrainingDialog = (resource: string, time: number) => ({
  type: constants.OPEN_CREATE_TRAINING_DIALOG,
  payload: { resource, time },
})

export const openUpdateTrainingDialog = (_id: string) => ({
  type: constants.OPEN_UPDATE_TRAINING_DIALOG,
  payload: { _id },
})

export const openAddTrainerDialog = () => ({
  type: constants.OPEN_ADD_TRAINER_DIALOG,
})

export const checkActiveTime = () => ({
  type: constants.CHECK_ACTIVE_TIME,
})

export const setActiveDate = (date: Date) => ({
  type: constants.SET_ACTIVE_DATE,
  payload: { date },
})

export const setActiveGym = (gym: string, resources: string[]) => ({
  type: constants.SET_ACTIVE_GYM,
  payload: { gym, resources },
})

export const setActiveResources = (resources: string[]) => ({
  type: constants.SET_ACTIVE_RESOURCES,
  payload: { resources },
})

export const setActiveTime = (time: number) => ({
  type: constants.SET_ACTIVE_TIME,
  payload: { time },
})

export const toggleOpenedTrainers = () => ({
  type: constants.TOGGLE_OPENED_TRAINERS,
})

export const openCheckDialog = (contact?: string) => ({
  type: constants.OPEN_CHECK_DIALOG,
  payload: { contact },
})

export const closeCheckDialog = () => ({
  type: constants.CLOSE_CHECK_DIALOG,
})

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
