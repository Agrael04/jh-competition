import constants from 'store/constants/schedule/training-dialog'

import { ITrainingRecord, ITrainingForm } from 'interfaces/training'

import removeTimeFromDate from 'utils/remove-time-from-date'

export interface IState {
  opened: boolean
  mode: 'create' | 'update' | null
  trainingForm: ITrainingForm
  recordsForm: ITrainingRecord[]
}

const initialState: IState = {
  opened: false,
  mode: null,
  trainingForm: {
    _id: '',

    startTime: 1,
    endTime: 29,
    resource: { link: '' },
    gym: { link: '' },
    trainer: undefined,
    date: removeTimeFromDate(new Date())!,

    name: '',
    type: '',
    note: '',
  },
  recordsForm: [],
}

export default (state = initialState, { type, payload }: { type: string, payload: any }): IState => {
  switch (type) {
    case constants.OPEN: {
      return {
        ...state,
        mode: payload.mode,
        opened: true,
        trainingForm: {
          ...initialState.trainingForm,
          ...payload.training,
        },
        recordsForm: payload.records,
      }
    }

    case constants.UPDATE_FIELD: {
      const value = payload.field === 'date' ? removeTimeFromDate(new Date(payload.value)) : payload.value

      return {
        ...state,
        trainingForm: {
          ...state.trainingForm,
          [payload.field]: value,
        },
      }
    }

    case constants.ADD_RECORD: {
      return {
        ...state,
        recordsForm: state.recordsForm.length < 3 ? [
          ...state.recordsForm,
          {
            trainee: {
              fullName: '',
              _id: '',
            },
            seasonPass: '',
            status: '',
            note: '',
            training: state.trainingForm._id,
          },
        ] : state.recordsForm,
      }
    }

    case constants.UPDATE_RECORD_FIELD: {
      return {
        ...state,
        recordsForm: state.recordsForm.map((item, index) => {
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

    case constants.REMOVE_RECORD: {
      return {
        ...state,
        recordsForm: state.recordsForm.filter((item, index) => index !== payload.index),
      }
    }

    case constants.CLOSE: {
      return {
        ...state,
        mode: null,
        opened: false,
        trainingForm: initialState.trainingForm,
        recordsForm: initialState.recordsForm,
      }
    }

    default:
      return state
  }
}
