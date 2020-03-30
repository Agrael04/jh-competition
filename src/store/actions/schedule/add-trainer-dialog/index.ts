import constants from 'store/constants/schedule/add-trainer-dialog'

export const open = (gym: number, date: Date) => ({
  type: constants.OPEN,
  payload: { gym, date },
})

export const close = () => ({
  type: constants.CLOSE,
  payload: null,
})

export const updateField = (field: string, value: any) => ({
  type: constants.UPDATE_FIELD,
  payload: { field, value },
})

export const addTimeFrame = () => ({
  type: constants.ADD_TIMEFRAME,
})

export const updateTimeframeField = (index: number, field: string, value: any) => ({
  type: constants.UPDATE_TIMEFRAME_FIELD,
  payload: { index, field, value },
})

export const removeTimeFrame = (index: number) => ({
  type: constants.REMOVE_TIMEFRAME,
  payload: { index },
})

export const actions = {
  open,
  close,
  updateField,
  addTimeFrame,
  updateTimeframeField,
  removeTimeFrame,
}

export default actions
