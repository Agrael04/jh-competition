import { BSON } from 'mongodb-stitch-browser-sdk'
import constants from 'store/constants/schedule'

import { ISearchedTrainee } from 'interfaces/trainee'
import ITraining, { ITrainingRecord } from 'interfaces/training'

interface ITraineeSuggester {
  loading: boolean
  options: ISearchedTrainee[]
}

export interface IState {
  openedRecordDialog: boolean
  currentDate: Date
  dialogMode: string | null
  trainingForm: ITraining
  recordsForm: ITrainingRecord[]
  traineeSuggester: ITraineeSuggester
}

const initialState: IState = {
  openedRecordDialog: false,
  currentDate: new Date(),
  dialogMode: null,
  trainingForm: {
    _id: '',

    time: '',
    resource: undefined,
    trainer: undefined,
    gym: undefined,
    date: '',

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
    case constants.OPEN_CREATE_RECORD_DIALOG: {
      return {
        ...state,
        dialogMode: 'create',
        openedRecordDialog: true,
        trainingForm: {
          _id: new BSON.ObjectID(),
          time: payload.target.time,
          resource: payload.target.resource,
          trainer: payload.trainer === null ? undefined : payload.trainer,
          gym: 1,
          date: '',

          name: '',
          type: '',
          markPrice: 2,
          moneyPrice: 400,
          note: '',
        },
        recordsForm: [],
      }
    }

    case constants.OPEN_UPDATE_RECORD_DIALOG: {
      return {
        ...state,
        dialogMode: 'update',
        openedRecordDialog: true,
        trainingForm: {
          ...initialState.trainingForm,
          ...payload.training,
        },
        recordsForm: payload.records,
      }
    }

    case constants.UPDATE_FORM_FIELD: {
      return {
        ...state,
        trainingForm: {
          ...state.trainingForm,
          [payload.field]: payload.value,
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
        openedRecordDialog: false,
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
        currentDate: payload.date,
      }
    }

    default:
      return state
  }
}
