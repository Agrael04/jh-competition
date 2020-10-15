import { createReducer, ActionType } from 'typesafe-actions'

import actions from 'store/actions/schedule/training-dialog'
import { ITrainingForm, ITrainingResourceForm, ITrainingRecordForm } from 'interfaces/training'

type IAction = ActionType<typeof actions>

export interface IState {
  opened: boolean
  _id: string | null

  trainingForm: ITrainingForm | null
  mode: 'create' | 'update' | null

  resourceForm: {
    isActive: boolean
    mode: 'create' | 'update' | null
    resource: Partial<ITrainingResourceForm> | null
  }

  recordForm: {
    isActive: boolean
    mode: 'create' | 'update' | null
    record: Partial<ITrainingRecordForm> | null
  }

  step: number
}

const initialState: IState = {
  opened: false,
  mode: null,
  _id: null,
  trainingForm: null,

  resourceForm: {
    isActive: false,
    mode: null,
    resource: null,
  },

  recordForm: {
    isActive: false,
    mode: null,
    record: null,
  },

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
  .handleAction(actions.initialize, (state, { payload: { training } }) => ({
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
  }))
  .handleAction(actions.close, state => ({
    ...state,
    ...initialState,
  }))

  .handleAction(actions.openCreateResourceForm, (state, { payload: { resource } }) => ({
    ...state,
    resourceForm: {
      resource: {
        training: { link: state._id! },
        startTime: resource?.startTime,
        endTime: resource?.endTime,
        resource: resource?.resource,
      },
      mode: 'create',
      isActive: true,
    },
  }))
  .handleAction(actions.openUpdateResourceForm, (state, { payload: { resource } }) => ({
    ...state,
    resourceForm: {
      resource: {
        _id: resource._id,
        training: resource.training,
        resource: resource.resource,
        trainer: resource.trainer,
        startTime: resource.startTime,
        endTime: resource.endTime,
      },
      mode: 'update',
      isActive: true,
    },
  }))
  .handleAction(actions.closeResource, state => ({
    ...state,
    resourceForm: initialState.resourceForm,
  }))

  .handleAction(actions.openCreateRecordForm, (state, { payload: { record } }) => ({
    ...state,
    recordForm: {
      record: {
        training: { link: state._id! },
        resource: record?.resource,
      },
      mode: 'create',
      isActive: true,
    },
    step: 2,
  }))
  .handleAction(actions.openUpdateRecordForm, (state, { payload: { record } }) => ({
    ...state,
    recordForm: {
      record: {
        _id: record._id!,
        training: record.training,
        resource: record.resource,
        contact: record.contact,
        attendant: record.attendant,
        status: record.status,
        note: record.note,
      },
      mode: 'update',
      isActive: true,
    },
    step: 2,
  }))
  .handleAction(actions.closeRecord, state => ({
    ...state,
    recordForm: initialState.recordForm,
  }))

  .handleAction(actions.setStep, (state, { payload: { step } }) => ({
    ...state,
    step,
  }))

export default reducer
