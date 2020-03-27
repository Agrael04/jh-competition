import constants from 'store/constants/schedule'

import { ISearchedTrainee } from 'interfaces/trainee'
import ITraining, { ITrainingRecord } from 'interfaces/training'

import removeTimeFromDate from 'utils/remove-time-from-date'

interface ITraineeSuggester {
  loading: boolean
  options: ISearchedTrainee[]
}

export interface IState {
  currentDate: Date
  currentGym: number
  openedTrainers: boolean

  openedTrainingDialog: boolean
  dialogMode: 'create' | 'update' | null
  trainingForm: ITraining
  recordsForm: ITrainingRecord[]
  traineeSuggester: ITraineeSuggester
}

const initialState: IState = {
  currentDate: removeTimeFromDate(new Date())!,
  currentGym: 1,
  openedTrainers: false,

  openedTrainingDialog: false,
  dialogMode: null,
  trainingForm: {
    _id: '',

    startTime: null,
    endTime: null,
    resource: undefined,
    trainer: undefined,
    gym: undefined,
    date: removeTimeFromDate(new Date())!,

    name: '',
    type: '',
    markPrice: null,
    moneyPrice: null,
    note: '',
  },
  recordsForm: [],
  traineeSuggester: {
    loading: false,
    options: [],
  },
}

export default (state = initialState, { type, payload }: { type: string, payload: any }): IState => {
  switch (type) {
    case constants.OPEN_TRAINING_DIALOG: {
      return {
        ...state,
        dialogMode: payload.mode,
        openedTrainingDialog: true,
        trainingForm: {
          ...initialState.trainingForm,
          ...payload.training,
        },
        recordsForm: payload.records,
      }
    }

    case constants.UPDATE_FORM_FIELD: {
      const value = payload.field === 'date' ? removeTimeFromDate(new Date(payload.value)) : payload.value

      return {
        ...state,
        trainingForm: {
          ...state.trainingForm,
          [payload.field]: value,
        },
      }
    }

    case constants.ADD_TRAINEE: {
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

    case constants.UPDATE_TRAINEE_FORM_FIELD: {
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

    case constants.REMOVE_TRAINEE: {
      return {
        ...state,
        recordsForm: state.recordsForm.filter((item, index) => index !== payload.index),
      }
    }

    case constants.CLOSE_RECORD_DIALOG: {
      return {
        ...state,
        dialogMode: null,
        openedTrainingDialog: false,
        trainingForm: initialState.trainingForm,
        recordsForm: initialState.recordsForm,
      }
    }

    case constants.SEARCH_TRAINEES: {
      return {
        ...state,
        traineeSuggester: {
          loading: true,
          options: [],
        },
      }
    }

    case constants.SEARCH_TRAINEES_SUCCESS: {
      return {
        ...state,
        traineeSuggester: {
          loading: false,
          options: payload.options,
        },
      }
    }

    case constants.SEARCH_TRAINEES_CANCEL: {
      return {
        ...state,
        traineeSuggester: {
          loading: false,
          options: [],
        },
      }
    }

    case constants.SET_CURRENT_DATE: {
      return {
        ...state,
        currentDate: removeTimeFromDate(payload.date)!,
      }
    }

    case constants.SET_CURRENT_GYM: {
      return {
        ...state,
        currentGym: payload.gym,
      }
    }

    case constants.TOGGLE_OPENED_TRAINERS: {
      return {
        ...state,
        openedTrainers: !state.openedTrainers,
      }
    }

    default:
      return state
  }
}
