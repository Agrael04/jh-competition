import constants from 'store/constants/schedule/training-dialog'

import { ITrainingForm, ITrainingResourceForm, ITrainingRecordForm } from 'interfaces/training'

import removeTimeFromDate from 'utils/remove-time-from-date'

export interface IState {
  opened: boolean
  _id: string | null

  trainingForm: ITrainingForm
  mode: 'create' | 'update' | null

  resourceForm: ITrainingResourceForm | null
  resourceMode: 'create' | 'update' | null

  recordForm: ITrainingRecordForm | null
  recordMode: 'create' | 'update' | null

  step: number
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
    traineesAmount: undefined,
    note: '',
  },

  resourceForm: null,
  resourceMode: null,

  recordForm: null,
  recordMode: null,

  step: 0,
}

export default (state = initialState, { type, payload }: { type: string, payload: any }): IState => {
  switch (type) {
    case constants.OPEN: {
      return {
        ...state,
        opened: true,
        mode: payload.mode,
        _id: payload._id,
        step: 0,
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
          traineesAmount: payload.training.traineesAmount,
          note: payload.training.note,
        },

        resourceForm: payload.resource,
        resourceMode: 'create',
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
        recordForm: null,
        recordMode: null,
        step: 1,
      }
    }

    case constants.RESET_RESOURCE: {
      return {
        ...state,
        resourceForm: null,
        resourceMode: null,
      }
    }

    case constants.UPDATE_RESOURCE: {
      return {
        ...state,
        resourceForm: {
          ...state.resourceForm,
          ...payload.resource,
        },
      }
    }

    case constants.SET_RECORD: {
      return {
        ...state,
        recordForm: payload.record,
        recordMode: payload.mode,
        resourceForm: null,
        resourceMode: null,
        step: 2,
      }
    }

    case constants.RESET_RECORD: {
      return {
        ...state,
        recordForm: null,
        recordMode: null,
      }
    }

    case constants.UPDATE_RECORD: {
      return {
        ...state,
        recordForm: {
          ...state.recordForm,
          ...payload.record,
        },
      }
    }

    case constants.SET_STEP: {
      return {
        ...state,
        step: payload.step,
      }
    }

    default:
      return state
  }
}
