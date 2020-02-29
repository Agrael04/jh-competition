import constants from '../../constants/trainings'

import ITraining from '../../../interfaces/training'

export const createTraining = () => ({
  type: constants.CREATE_TRAINING,
})

export const readTrainings = () => ({
  type: constants.READ_TRAININGS,
})

export const updateTraining = () => ({
  type: constants.UPDATE_TRAINING,
})

export const deleteTraining = () => ({
  type: constants.DELETE_TRAINING,
})

export const readTrainingsSuccess = (data: ITraining[]) => ({
  type: constants.READ_TRAININGS_SUCCESS,
  payload: { data },
})

export default {
  createTraining,
  readTrainings,
  updateTraining,
  deleteTraining,
  readTrainingsSuccess,
}
