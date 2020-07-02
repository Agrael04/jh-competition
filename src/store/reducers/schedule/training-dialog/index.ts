import { createReducer, ActionType } from 'typesafe-actions'

import actions from 'store/actions/schedule/training-dialog'
import { ITrainingForm, ITrainingResourceForm, ITrainingRecordForm } from 'interfaces/training'

import removeTimeFromDate from 'utils/remove-time-from-date'

type IAction = ActionType<typeof actions>

export interface IState {
  opened: boolean
  _id: string | null

  trainingForm: ITrainingForm
  mode: 'create' | 'update' | null

  resourceForm: ITrainingResourceForm | null | undefined
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

const reducer = createReducer<IState, IAction>(initialState)
  .handleAction(actions.open, (state, { payload: { mode, _id } }) => ({
    ...state,
    opened: true,
    mode,
    _id,
    step: 0,
  }))
  .handleAction(actions.initialize, (state, { payload: { training, resource } }) => ({
    ...state,
    trainingForm: {
      _id: training._id!,
      gym: training.gym!,
      date: training.date!,

      name: training.name,
      type: training.type,
      traineesAmount: training.traineesAmount,
      note: training.note,
    },

    resourceForm: resource,
    resourceMode: 'create',
    recordForm: null,
    recordMode: null,
  }))
  .handleAction(actions.close, state => ({
    ...state,
    ...initialState,
  }))
  .handleAction(actions.updateField, (state, { payload: { field, value } }) => ({
    ...state,
    trainingForm: {
      ...state.trainingForm,
      [field]: field === 'date' ? removeTimeFromDate(new Date(value)) : value,
    },
  }))
  .handleAction(actions.setResource, (state, { payload: { resource, mode } }) => ({
    ...state,
    resourceForm: resource,
    resourceMode: mode,
    recordForm: null,
    recordMode: null,
    step: 1,
  }))
  .handleAction(actions.resetResource, state => ({
    ...state,
    resourceForm: null,
    resourceMode: null,
  }))
  .handleAction(actions.updateResource, (state, { payload: { resource } }) => ({
    ...state,
    resourceForm: {
      ...state.resourceForm,
      ...resource,
    } as ITrainingResourceForm,
  }))
  .handleAction(actions.setRecord, (state, { payload: { record, mode } }) => ({
    ...state,
    recordForm: record,
    recordMode: mode,
    resourceForm: null,
    resourceMode: null,
    step: 2,
  }))
  .handleAction(actions.resetRecord, state => ({
    ...state,
    recordForm: null,
    recordMode: null,
  }))
  .handleAction(actions.updateRecord, (state, { payload: { record } }) => ({
    ...state,
    recordForm: {
      ...state.recordForm,
      ...record,
    } as ITrainingRecordForm,
  }))
  .handleAction(actions.setStep, (state, { payload: { step } }) => ({
    ...state,
    step,
  }))

export default reducer
