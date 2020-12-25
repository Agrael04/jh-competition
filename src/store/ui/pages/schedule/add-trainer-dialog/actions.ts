import { createAction } from 'typesafe-actions'

export const open = createAction(
  '@ui/pages/schedule/trainerScheduleDialog/OPEN'
)()

export const close = createAction(
  '@ui/pages/schedule/trainerScheduleDialog/CLOSE'
)()

export const actions = {
  open,
  close,
}

export default actions
