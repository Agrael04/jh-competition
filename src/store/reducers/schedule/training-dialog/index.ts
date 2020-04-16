import constants from 'store/constants/schedule/training-dialog'

import { ITrainingRecord, ITrainingForm, ITrainingResourceForm } from 'interfaces/training'

import removeTimeFromDate from 'utils/remove-time-from-date'

export interface IState {
  opened: boolean
  mode: 'create' | 'update' | null
  _id: string | null

  trainingForm: ITrainingForm
  recordsForm: ITrainingRecord[]

  resources: ITrainingResourceForm[]
  resourceForm: ITrainingResourceForm | null
  resourceMode: 'create' | 'update' | null
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
  recordsForm: [],

  resources: [],
  resourceForm: null,
  resourceMode: null,
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
          ...initialState.trainingForm,
          ...payload.training,
        },
        recordsForm: payload.records,

        resources: payload.resources,
        resourceForm: null,
      }
    }

    case constants.CLOSE: {
      return {
        ...state,
        mode: null,
        _id: null,
        opened: false,
        trainingForm: initialState.trainingForm,
        resources: initialState.resources,
        resourceForm: initialState.resourceForm,
        recordsForm: initialState.recordsForm,
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

    default:
      return state
  }
}
