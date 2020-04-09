import constants from 'store/constants/schedule/page'

import { ITrainingRecord } from 'interfaces/training'

export const openCreateTrainingDialog = (resource: string, time: number) => ({
  type: constants.OPEN_CREATE_TRAINING_DIALOG,
  payload: { resource, time },
})

export const openUpdateTrainingDialog = (training: any, records: ITrainingRecord[]) => ({
  type: constants.OPEN_UPDATE_TRAINING_DIALOG,
  payload: { training, records },
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
}

export default actions
