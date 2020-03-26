import constants from 'store/constants/schedule'

import { ISearchedTrainee } from 'interfaces/trainee'
import IRecord, { ITrainingRecord } from 'interfaces/training'

interface ICell {
  resource: number
  time: number
}

export const openCreateDialog = (target: ICell, trainer?: number) => ({
  type: constants.OPEN_CREATE_RECORD_DIALOG,
  payload: { trainer, target },
})

export const openUpdateDialog = (training: IRecord, records: ITrainingRecord[]) => ({
  type: constants.OPEN_UPDATE_RECORD_DIALOG,
  payload: { training, records },
})

export const closeRecordDialog = () => ({
  type: constants.CLOSE_RECORD_DIALOG,
  payload: null,
})

export const updateFormField = (field: string, value: any) => ({
  type: constants.UPDATE_FORM_FIELD,
  payload: { field, value },
})

export const addTrainee = () => ({
  type: constants.ADD_TRAINEE,
})

export const updateTraineeFormField = (index: number, field: string, value: any) => ({
  type: constants.UPDATE_TRAINEE_FORM_FIELD,
  payload: { index, field, value },
})

export const removeTrainee = (index: number) => ({
  type: constants.REMOVE_TRAINEE,
  payload: { index },
})

export const searchTrainees = (filter: string) => ({
  type: constants.SEARCH_TRAINEES,
  payload: { filter },
})

export const searchTraineesSuccess = (options: ISearchedTrainee[]) => ({
  type: constants.SEARCH_TRAINEES_SUCCESS,
  payload: { options },
})

export const searchTraineesCancel = () => ({
  type: constants.SEARCH_TRAINEES_CANCEL,
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

export default {
  openCreateDialog,
  openUpdateDialog,
  closeRecordDialog,

  updateFormField,
  addTrainee,
  updateTraineeFormField,
  removeTrainee,

  searchTrainees,
  searchTraineesSuccess,
  searchTraineesCancel,

  setCurrentDate,
  setCurrentGym,

  toggleOpenedTrainers,
}
