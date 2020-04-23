import constants from 'store/constants/schedule/training-dialog'

import { ITrainingForm, ITrainingResourceForm, ITrainingRecordForm } from 'interfaces/training'

import removeTimeFromDate from 'utils/remove-time-from-date'

export interface IState {
  opened: boolean
  mode: 'create' | 'update' | null
  _id: string | null

  trainingForm: ITrainingForm

  resources: ITrainingResourceForm[]
  resourceForm: ITrainingResourceForm | null
  resourceMode: 'create' | 'update' | null

  records: ITrainingRecordForm[]
  recordForm: ITrainingRecordForm | null
  recordMode: 'create' | 'update' | null
}

const initialState: IState = {
  opened: false,
  mode: null,
  _id: null,
  trainingForm: {
    _id: '',

    gym: { link: '' },
    date: removeTimeFromDate(new Date())!,

    name: '',
    type: '',
    traineesCount: 1,
    note: '',
  },
  // recordsForm: [],

  resources: [],
  resourceForm: null,
  resourceMode: null,

  records: [],
  recordForm: null,
  recordMode: null,
}

export default (state = initialState, { type, payload }: { type: string, payload: any }): IState => {
  switch (type) {
    case constants.OPEN: {
      return {
        ...state,
        opened: true,
        mode: payload.mode,
        _id: payload._id,
      }
    }

    case constants.INITIALIZE: {
      return {
        ...state,

        trainingForm: {
          _id: payload.training._id,

          gym: payload.training.gym,
          date: payload.training.date,

          name: payload.training.name,
          type: payload.training.type,
          traineesCount: payload.training.traineesCount,
          note: payload.training.note,
        },

        resources: payload.resources,
        records: payload.records,
        resourceForm: null,
        resourceMode: null,
        recordForm: null,
        recordMode: null,
      }
    }

    case constants.CLOSE: {
      return {
        ...state,
        ...initialState,
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

    case constants.SET_RESOURCE: {
      return {
        ...state,
        resourceForm: payload.resource,
        resourceMode: payload.mode,
      }
    }

    case constants.UPDATE_RESOURCE_FIELD: {
      return {
        ...state,
        resourceForm: {
          ...state.resourceForm,
          [payload.field]: payload.value,
        } as ITrainingResourceForm,
      }
    }

    case constants.SAVE_RESOURCE: {
      if (state.resourceMode === 'create') {
        return {
          ...state,
          resources: [
            ...state.resources,
            state.resourceForm!,
          ],
          resourceForm: null,
          resourceMode: null,
        }
      }

      return {
        ...state,
        resources: state.resources.map(item => {
          if (item._id === state.resourceForm?._id) {
            return state.resourceForm!
          }

          return item
        }),
        resourceForm: null,
        resourceMode: null,
      }
    }

    case constants.REMOVE_RESOURCE: {
      return {
        ...state,
        resources: state.resources.filter(item => item._id !== payload._id),
      }
    }

    case constants.SET_RECORD: {
      return {
        ...state,
        recordForm: payload.record,
        recordMode: payload.mode,
      }
    }

    case constants.UPDATE_RECORD_FIELD: {
      return {
        ...state,
        recordForm: {
          ...state.recordForm,
          [payload.field]: payload.value,
        } as ITrainingRecordForm,
      }
    }

    case constants.SAVE_RECORD: {
      if (state.recordMode === 'create') {
        return {
          ...state,
          records: [
            ...state.records,
            state.recordForm!,
          ],
          recordForm: null,
          recordMode: null,
        }
      }

      return {
        ...state,
        records: state.records.map(item => {
          if (item._id === state.recordForm?._id) {
            return state.recordForm!
          }

          return item
        }),
        recordForm: null,
        recordMode: null,
      }
    }

    case constants.REMOVE_RECORD: {
      return {
        ...state,
        records: state.records.filter(item => item._id !== payload._id),
      }
    }

    default:
      return state
  }
}
