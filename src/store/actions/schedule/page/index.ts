import constants from 'store/constants/schedule/page'

import ITraining, { ITrainingRecord } from 'interfaces/training'

interface IApolloTraining extends ITraining {
  __typename?: string
}

export const openCreateTrainingDialog = (resource: number, time: number) => ({
  type: constants.OPEN_CREATE_TRAINING_DIALOG,
  payload: { resource, time },
})

export const openUpdateTrainingDialog = (training: IApolloTraining, records: ITrainingRecord[]) => ({
  type: constants.OPEN_UPDATE_TRAINING_DIALOG,
  payload: { training, records },
})

export const openAddTrainerDialog = () => ({
  type: constants.OPEN_ADD_TRAINER_DIALOG,
})

export const setActiveDate = (date: Date) => ({
  type: constants.SET_ACTIVE_DATE,
  payload: { date },
})

export const setActiveGym = (gym: number) => ({
  type: constants.SET_ACTIVE_GYM,
  payload: { gym },
})

export const setActiveResources = (resources: number[]) => ({
  type: constants.SET_ACTIVE_RESOURCES,
  payload: { resources },
})

export const toggleOpenedTrainers = () => ({
  type: constants.TOGGLE_OPENED_TRAINERS,
})

export const actions = {
  openCreateTrainingDialog,
  openUpdateTrainingDialog,

  openAddTrainerDialog,

  setActiveDate,
  setActiveGym,
  setActiveResources,

  toggleOpenedTrainers,
}

export default actions
