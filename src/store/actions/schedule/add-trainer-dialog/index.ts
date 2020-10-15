import { createAction } from 'typesafe-actions'

export const open = createAction(
  'schedule/trainerScheduleDialog/OPEN'
)()

export const close = createAction(
  'schedule/trainerScheduleDialog/CLOSE'
)()

export const actions = {
  open,
  close,
}

export default actions
