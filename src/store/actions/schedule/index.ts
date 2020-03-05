import constants from 'store/constants/schedule'

import { ISearchedTrainee } from 'interfaces/trainee'
import IRecord from 'interfaces/training'

interface ICell {
  resource: number
  time: string
}

export const moveRecord = (source: ICell, target: ICell) => ({
  type: constants.MOVE_RECORD,
  payload: { source, target },
})

export const openCreateDialog = (payload: IRecord) => ({
  type: constants.OPEN_CREATE_RECORD_DIALOG,
  payload,
})

export const openUpdateDialog = (payload: IRecord) => ({
  type: constants.OPEN_UPDATE_RECORD_DIALOG,
  payload,
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

export default {
  moveRecord,
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
}
