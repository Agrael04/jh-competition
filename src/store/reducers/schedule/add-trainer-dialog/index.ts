import constants from 'store/constants/schedule/add-trainer-dialog'

import removeTimeFromDate from 'utils/remove-time-from-date'

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

export default (state = initialState, { type, payload }: { type: string, payload: any }): IState => {
  switch (type) {
    case constants.OPEN: {
      return {
        ...state,
        opened: true,
        gym: payload.gym,
        form: {
          date: payload.date,
          trainer: undefined,
        },
        timeFrames: [{
          from: undefined,
          to: undefined,
          gym: payload.gym,
        }],
      }
    }

    case constants.CLOSE: {
      return {
        ...state,
        opened: false,
        form: initialState.form,
        timeFrames: initialState.timeFrames,
      }
    }

    case constants.UPDATE_FIELD: {
      const value = payload.field === 'date' ? removeTimeFromDate(new Date(payload.value)) : payload.value

      return {
        ...state,
        form: {
          ...state.form,
          [payload.field]: value,
        },
      }
    }

    case constants.ADD_TIMEFRAME: {
      return {
        ...state,
        timeFrames: state.timeFrames.length < 3 ? [
          ...state.timeFrames,
          {
            from: undefined,
            to: undefined,
            gym: state.gym,
          },
        ] : state.timeFrames,
      }
    }

    case constants.UPDATE_TIMEFRAME_FIELD: {
      return {
        ...state,
        timeFrames: state.timeFrames.map((item, index) => {
          if (index !== payload.index) {
            return item
          }

          return {
            ...item,
            [payload.field]: payload.value,
          }
        }),
      }
    }

    case constants.REMOVE_TIMEFRAME: {
      return {
        ...state,
        timeFrames: state.timeFrames.length > 1
          ? state.timeFrames.filter((item, index) => index !== payload.index)
          : state.timeFrames,
      }
    }

    default:
      return state
  }
}
