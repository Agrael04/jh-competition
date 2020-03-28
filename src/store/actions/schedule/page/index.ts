import constants from 'store/constants/schedule/page'

import ITraining, { ITrainingRecord } from 'interfaces/training'

interface IApolloTraining extends ITraining {
  __typename?: string
}

export const openCreateDialog = (resource: number, time: number) => ({
  type: constants.OPEN_CREATE_TRAINING_DIALOG,
  payload: { resource, time },
})

export const openUpdateDialog = (training: IApolloTraining, records: ITrainingRecord[]) => ({
  type: constants.OPEN_UPDATE_TRAINING_DIALOG,
  payload: { training, records },
})

export const setCurrentDate = (date: Date) => ({
  type: constants.SET_CURRENT_DATE,
  payload: { date },
})

export const setCurrentGym = (gym: number) => ({
  type: constants.SET_CURRENT_GYM,
  payload: { gym },
})

export const toggleOpenedTrainers = () => ({
  type: constants.TOGGLE_OPENED_TRAINERS,
})

export const actions = {
  openCreateDialog,
  openUpdateDialog,

  setCurrentDate,
  setCurrentGym,

  toggleOpenedTrainers,
}

export default actions
