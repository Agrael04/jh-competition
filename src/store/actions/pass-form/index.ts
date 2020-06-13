import constants from 'store/constants/pass-form'

import { ITrainingPassForm } from 'interfaces/training-pass'

export const open = (mode: string, pass: Partial<ITrainingPassForm>, initialFilter: string) => ({
  type: constants.OPEN,
  payload: { mode, pass, initialFilter },
})

export const close = () => ({
  type: constants.CLOSE,
  payload: null,
})

export const actions = {
  open,
  close,
}

export default actions
