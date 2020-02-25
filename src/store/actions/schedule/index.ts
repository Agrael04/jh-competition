import constants from '../../constants/schedule'

import { ISearchedTrainee } from '../../../interfaces/trainee'

interface IRecord {
  time: string
  resource: number
  trainer?: number
  gym: number
  date: Date
}

interface ICell {
  resource: number
  time: string
}

export const createRecord = () => ({
  type: constants.CREATE_RECORD,
})

export const moveRecord = (source: ICell, target: ICell, trainer: number) => ({
  type: constants.MOVE_RECORD,
  payload: { source, target, trainer },
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
  createRecord,
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
