import { createAction } from 'typesafe-actions'

export const open = createAction(
  'schedule/trainerScheduleDialog/OPEN',
  (gym: string, date: Date) => ({ gym, date })
)()

export const close = createAction(
  'schedule/trainerScheduleDialog/CLOSE'
)()

export const updateField = createAction(
  'schedule/trainerScheduleDialog/UPDATE_FIELD',
  (field: string, value: any) => ({ field, value })
)()

export const addTimeFrame = createAction(
  'schedule/trainerScheduleDialog/ADD_TIMEFRAME'
)()

export const updateTimeframeField = createAction(
  'schedule/trainerScheduleDialog/UPDATE_TIMEFRAME_FIELD',
  (index: number, field: string, value: any) => ({ index, field, value })
)()

export const removeTimeFrame = createAction(
  'schedule/trainerScheduleDialog/REMOVE_TIMEFRAME',
  (index: number) => ({ index })
)()

export const actions = {
  open,
  close,
  updateField,
  addTimeFrame,
  updateTimeframeField,
  removeTimeFrame,
}

export default actions
