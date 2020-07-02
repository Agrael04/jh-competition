import { createReducer, ActionType } from 'typesafe-actions'

import actions from 'store/actions/schedule/add-trainer-dialog'

import removeTimeFromDate from 'utils/remove-time-from-date'

type IAction = ActionType<typeof actions>

interface ITimeFrame {
  from: number | undefined
  to: number | undefined
  gym: string
}

interface IForm {
  date: Date
  trainer: string | undefined
}

export interface IState {
  opened: boolean
  gym: string
  form: IForm
  timeFrames: ITimeFrame[]
}

const initialState: IState = {
  opened: false,
  gym: '',
  form: {
    date: new Date(),
    trainer: undefined,
  },
  timeFrames: [],
}

const reducer = createReducer<IState, IAction>(initialState)
  .handleAction(actions.open, (state, { payload: { gym, date } }) => ({
    ...state,
    opened: true,
    gym,
    form: {
      date,
      trainer: undefined,
    },
    timeFrames: [{
      from: undefined,
      to: undefined,
      gym,
    }],
  }))
  .handleAction(actions.close, () => initialState)
  .handleAction(actions.updateField, (state, { payload: { field, value } }) => ({
    ...state,
    form: {
      ...state.form,
      [field]: field === 'date' ? removeTimeFromDate(new Date(value)) : value,
    },
  }))
  .handleAction(actions.addTimeFrame, state => ({
    ...state,
    timeFrames: state.timeFrames.length < 3 ? [
      ...state.timeFrames,
      {
        from: undefined,
        to: undefined,
        gym: state.gym,
      },
    ] : state.timeFrames,
  }))
  .handleAction(actions.updateTimeframeField, (state, { payload: { index, field, value } }) => ({
    ...state,
    timeFrames: state.timeFrames.map((item, i) => {
      if (i !== index) {
        return item
      }

      return {
        ...item,
        [field]: value,
      }
    }),
  }))
  .handleAction(actions.removeTimeFrame, (state, { payload: { index } }) => ({
    ...state,
    timeFrames: state.timeFrames.length > 1
      ? state.timeFrames.filter((item, i) => i !== index)
      : state.timeFrames,
  }))

export default reducer
