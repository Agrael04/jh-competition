import constants from 'store/constants/schedule/check-dialog'

import { ITrainingPassForm } from 'interfaces/training-pass'

export const open = (contact: string) => ({
  type: constants.OPEN,
  payload: { contact },
})

export const initialize = (pass: Partial<ITrainingPassForm>) => ({
  type: constants.INITIALIZE,
  payload: { pass },
})

export const close = () => ({
  type: constants.CLOSE,
  payload: null,
})

export const openPass = (pass?: Partial<ITrainingPassForm>) => ({
  type: constants.OPEN_PASS,
  payload: { pass },
})

export const setPass = (pass: ITrainingPassForm | null, mode: 'create' | 'update' | null) => ({
  type: constants.SET_PASS,
  payload: { pass, mode },
})

export const resetPass = () => ({
  type: constants.RESET_PASS,
})

export const updatePass = (pass: Partial<ITrainingPassForm>) => ({
  type: constants.UPDATE_PASS,
  payload: { pass },
})

export const actions = {
  open,
  initialize,
  close,

  openPass,
  setPass,
  resetPass,
  updatePass,
}

export default actions
