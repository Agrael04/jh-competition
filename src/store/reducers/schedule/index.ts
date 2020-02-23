import constants from '../../constants/schedule'

import { schedule as initialSchedule } from '../../../routes/schedule/data'

import { ISearchedTrainee } from '../../../interfaces/trainee'

interface IRecordForm {
  gym: number | undefined
  date: Date | undefined
  trainer: number | undefined
  time: string
  resource: number | undefined

  name?: string
  type: string
  markPrice: number | null
  moneyPrice: number | null
  note: string

  trainees: Array<{
    traineeId: string
    seasonPass: string
    status: string
    note: string
  }>
}

interface ITraineeSuggester {
  loading: boolean
  options: ISearchedTrainee[]
}

interface IRecord {
  time: string
  resource: number
  trainer: number
  gym: number
  date: Date
}

export interface IState {
  schedule: IRecord[]
  openedRecordDialog: boolean
  dialogMode: string | null
  recordForm: IRecordForm
  traineeSuggester: ITraineeSuggester
}

const initialState: IState = {
  schedule: initialSchedule,
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

    trainees: [],
  },
  traineeSuggester: {
    loading: false,
    options: [],
  },
}

export default (state = initialState, { type, payload }: { type: string, payload: any }): IState => {
  switch (type) {
    case constants.CREATE_RECORD: {
      return {
        ...state,
        openedRecordDialog: false,
        dialogMode: null,
        recordForm: initialState.recordForm,
        schedule: [
          ...state.schedule,
          state.recordForm as IRecord,
        ],
      }
    }

    case constants.MOVE_RECORD: {
      const { target, source } = payload
      const targetIndex = state.schedule.findIndex(record => record.time === target.time && record.resource === target.resource)
      const sourceIndex = state.schedule.findIndex(record => record.time === source.time && record.resource === source.resource)

      if (targetIndex === -1) {
        return {
          ...state,
          schedule: [
            ...state.schedule.filter((i, index) => index !== sourceIndex),
            { time: target.time, resource: target.resource, trainer: state.schedule[sourceIndex].trainer } as IRecord,
          ],
        }
      } else {
        return {
          ...state,
          schedule: [
            ...state.schedule.filter((i, index) => index !== sourceIndex && index !== targetIndex),
            { time: target.time, resource: target.resource, trainer: state.schedule[sourceIndex].trainer } as IRecord,
            { time: source.time, resource: source.resource, trainer: state.schedule[targetIndex].trainer } as IRecord,
          ],
        }
      }
    }

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
          markPrice: 0,
          moneyPrice: 0,
          note: '',

          trainees: [],
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
        } as any,
      }
    }

    case constants.ADD_TRAINEE: {
      return {
        ...state,
        recordForm: {
          ...state.recordForm,
          trainees: state.recordForm.trainees.length < 3 ? [
            ...state.recordForm.trainees,
            {
              name: '',
              seasonPass: '',
              status: '',
              note: '',
            },
          ] : state.recordForm.trainees,
        } as any,
      }
    }

    case constants.UPDATE_TRAINEE_FORM_FIELD: {
      return {
        ...state,
        recordForm: {
          ...state.recordForm,
          trainees: state.recordForm?.trainees.map((item, index) => {
            if (index !== payload.index) {
              return item
            }

            return {
              ...item,
              [payload.field]: payload.value,
            }
          }),
        } as any,
      }
    }

    case constants.REMOVE_TRAINEE: {
      return {
        ...state,
        recordForm: {
          ...state.recordForm,
          trainees: state.recordForm.trainees.filter((item, index) => index !== payload.index),
        } as any,
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

    default:
      return state
  }
}
