import constants from '../../constants/schedule'

interface IRecord {
  time: string
  resource: number
  trainer: number
  gym: number
  date: Date
}

interface ICell {
  resource: number
  time: string
}

export const createRecord = (record: IRecord) => ({
  type: constants.CREATE_RECORD,
  payload: { record },
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

export default {
  createRecord,
  moveRecord,
  openCreateDialog,
  openUpdateDialog,
  closeRecordDialog,
}
