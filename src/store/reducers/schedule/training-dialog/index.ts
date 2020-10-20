import { createReducer, ActionType } from 'typesafe-actions'

import actions from 'store/actions/schedule/training-dialog'

import ITrainingForm from 'routes/schedule/training-dialog/training-step/training-form/form'
import IResourceForm from 'routes/schedule/training-dialog/resources-step/resource-form/form'
import IRecordForm from 'routes/schedule/training-dialog/records-step/record-form/form'

type IAction = ActionType<typeof actions>

interface IForm<T> {
  isActive: boolean
  mode?: 'create' | 'update'
  _id?: string
  defaultValues?: Partial<T>
}

export interface IState {
  opened: boolean
  _id: string | null
  step: number

  trainingForm: IForm<ITrainingForm>
  resourceForm: IForm<IResourceForm>
  recordForm: IForm<IRecordForm>
}

const initialState: IState = {
  opened: false,
  _id: null,

  trainingForm: {
    isActive: false,
  },

  resourceForm: {
    isActive: false,
  },

  recordForm: {
    isActive: false,
  },

  step: 0,
}

const reducer = createReducer<IState, IAction>(initialState)
  .handleAction(actions.open, (state, { payload: { _id } }) => ({
    ...state,
    opened: true,
    _id,
    step: 0,
  }))
  .handleAction(actions.close, state => ({
    ...state,
    ...initialState,
  }))

  .handleAction(actions.openCreateTrainingForm, (state, { payload: { defaultValues } }) => ({
    ...state,
    trainingForm: {
      defaultValues,
      mode: 'create',
      isActive: true,
    },
  }))
  .handleAction(actions.openUpdateTrainingForm, (state, { payload: { _id, defaultValues } }) => ({
    ...state,
    trainingForm: {
      _id,
      defaultValues,
      mode: 'update',
      isActive: true,
    },
  }))
  .handleAction(actions.closeTraining, state => ({
    ...state,
    trainingForm: initialState.trainingForm,
  }))

  .handleAction(actions.openCreateResourceForm, (state, { payload: { defaultValues } }) => ({
    ...state,
    resourceForm: {
      defaultValues,
      mode: 'create',
      isActive: true,
    },
  }))
  .handleAction(actions.openUpdateResourceForm, (state, { payload: { _id, defaultValues } }) => ({
    ...state,
    resourceForm: {
      _id,
      defaultValues,
      mode: 'update',
      isActive: true,
    },
  }))
  .handleAction(actions.closeResource, state => ({
    ...state,
    resourceForm: initialState.resourceForm,
  }))

  .handleAction(actions.openCreateRecordForm, (state, { payload: { defaultValues } }) => ({
    ...state,
    recordForm: {
      defaultValues,
      mode: 'create',
      isActive: true,
    },
    step: 2,
  }))
  .handleAction(actions.openUpdateRecordForm, (state, { payload: { _id, defaultValues } }) => ({
    ...state,
    recordForm: {
      _id,
      defaultValues,
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
