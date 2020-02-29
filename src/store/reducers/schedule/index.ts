import constants from '../../constants/schedule'

// import { schedule as initialSchedule } from '../../../routes/schedule/data'

import { ISearchedTrainee } from '../../../interfaces/trainee'
import ITraining from '../../../interfaces/training'

interface ITraineeSuggester {
  loading: boolean
  options: ISearchedTrainee[]
}

export interface IState {
  // schedule: ITraining[]
  openedRecordDialog: boolean
  dialogMode: string | null
  recordForm: ITraining
  traineeSuggester: ITraineeSuggester
}

const initialState: IState = {
  // schedule: initialSchedule,
  openedRecordDialog: false,
  dialogMode: null,
  recordForm: {
    time: '',
    resource: undefined,
    trainer: undefined,
    gym: undefined,
    date: undefined,

    name: '',
    type: '',
    markPrice: null,
    moneyPrice: null,
    note: '',

    records: [],
  },
  traineeSuggester: {
    loading: false,
    options: [],
  },
}

export default (state = initialState, { type, payload }: { type: string, payload: any }): IState => {
  switch (type) {
    // case constants.MOVE_RECORD: {
    //   const { target, source } = payload
    //   const targetIndex = state.schedule.findIndex(record => record.time === target.time && record.resource === target.resource)
    //   const sourceIndex = state.schedule.findIndex(record => record.time === source.time && record.resource === source.resource)

    //   if (targetIndex === -1) {
    //     return {
    //       ...state,
    //       schedule: [
    //         ...state.schedule.filter((i, index) => index !== sourceIndex),
    //         { time: target.time, resource: target.resource, trainer: state.schedule[sourceIndex].trainer } as ITraining,
    //       ],
    //     }
    //   } else {
    //     return {
    //       ...state,
    //       schedule: [
    //         ...state.schedule.filter((i, index) => index !== sourceIndex && index !== targetIndex),
    //         { time: target.time, resource: target.resource, trainer: state.schedule[sourceIndex].trainer } as ITraining,
    //         { time: source.time, resource: source.resource, trainer: state.schedule[targetIndex].trainer } as ITraining,
    //       ],
    //     }
    //   }
    // }

    case constants.OPEN_CREATE_RECORD_DIALOG: {
      return {
        ...state,
        dialogMode: 'create',
        openedRecordDialog: true,
        recordForm: {
          time: payload.time,
          resource: payload.resource,
          trainer: payload.trainer,
          gym: payload.gym,
          date: payload.date,

          name: '',
          type: '',
          markPrice: 2,
          moneyPrice: 400,
          note: '',

          records: [],
        },
      }
    }

    case constants.OPEN_UPDATE_RECORD_DIALOG: {
      return {
        ...state,
        dialogMode: 'update',
        openedRecordDialog: true,
        recordForm: {
          ...initialState.recordForm,
          ...payload,
        },
      }
    }

    case constants.UPDATE_FORM_FIELD: {
      return {
        ...state,
        recordForm: {
          ...state.recordForm,
          [payload.field]: payload.value,
        },
      }
    }

    case constants.ADD_TRAINEE: {
      return {
        ...state,
        recordForm: {
          ...state.recordForm,
          records: state.recordForm.records.length < 3 ? [
            ...state.recordForm.records,
            {
              trainee: {
                fullName: '',
                _id: '',
              },
              seasonPass: '',
              status: '',
              note: '',
            },
          ] : state.recordForm.records,
        },
      }
    }

    case constants.UPDATE_TRAINEE_FORM_FIELD: {
      return {
        ...state,
        recordForm: {
          ...state.recordForm,
          records: state.recordForm?.records.map((item, index) => {
            if (index !== payload.index) {
              return item
            }

            return {
              ...item,
              [payload.field]: payload.value,
            }
          }),
        },
      }
    }

    case constants.REMOVE_TRAINEE: {
      return {
        ...state,
        recordForm: {
          ...state.recordForm,
          records: state.recordForm.records.filter((item, index) => index !== payload.index),
        },
      }
    }

    case constants.CLOSE_RECORD_DIALOG: {
      return {
        ...state,
        dialogMode: null,
        openedRecordDialog: false,
        recordForm: initialState.recordForm,
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

    default:
      return state
  }
}
