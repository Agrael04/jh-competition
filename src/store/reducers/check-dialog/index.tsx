import { ActionType, createReducer } from 'typesafe-actions'
import actions from 'store/actions/check-dialog'
import moment, { Moment } from 'moment'

import IForm from 'interfaces/form-state'

import IPositionForm from 'containers/check-dialog/positions-block/position-form/form'
import IPaymentForm from 'containers/check-dialog/payments-block/payment-form/form'
import { ITrainingPassForm } from 'interfaces/training-pass'

type IAction = ActionType<typeof actions>

export interface IState {
  opened: boolean
  params: {
    activeDate: Moment
    activeGym: string
    contact: {
      link: string
    } | null
  }

  positionForm: IForm<IPositionForm>
  paymentForm: IForm<IPaymentForm>
  passForm: IForm<ITrainingPassForm>
}

const initialState = {
  opened: false,
  params: {
    activeDate: moment().startOf('day'),
    activeGym: '',
    contact: null,
  },

  positionForm: {
    isActive: false,
  },

  paymentForm: {
    isActive: false,
  },

  passForm: {
    isActive: false,
  },
}

const reducer = createReducer<IState, IAction>(initialState)
  .handleAction(actions.openDialog, (state, { payload: { activeDate, activeGym, contact } }) => ({
    ...state,
    opened: true,
    params: {
      activeDate,
      activeGym,
      contact,
    },
  }))
  .handleAction(actions.closeDialog, state => ({
    ...state,
    ...initialState,
  }))
  .handleAction(actions.updateContact, (state, { payload: { contact } }) => ({
    ...state,
    params: {
      ...state.params,
      contact,
    },
  }))
  .handleAction(actions.updateActiveDate, (state, { payload: { activeDate } }) => ({
    ...state,
    params: {
      ...state.params,
      activeDate,
    },
  }))
  .handleAction(actions.openCreatePositionForm, (state, { payload: { defaultValues } }) => ({
    ...state,
    positionForm: {
      defaultValues,
      isActive: true,
      mode: 'create',
    },
  }))
  .handleAction(actions.openUpdatePositionForm, (state, { payload: { _id, defaultValues } }) => ({
    ...state,
    positionForm: {
      _id,
      defaultValues,
      isActive: true,
      mode: 'update',
    },
  }))
  .handleAction(actions.closePositionForm, state => ({
    ...state,
    positionForm: initialState.positionForm,
  }))
  .handleAction(actions.openCreatePaymentForm, (state, { payload: { defaultValues } }) => ({
    ...state,
    paymentForm: {
      defaultValues,
      isActive: true,
      mode: 'create',
    },
  }))
  .handleAction(actions.openUpdatePaymentForm, (state, { payload: { _id, defaultValues } }) => ({
    ...state,
    paymentForm: {
      _id,
      defaultValues,
      isActive: true,
      mode: 'update',
    },
  }))
  .handleAction(actions.closePaymentForm, state => ({
    ...state,
    paymentForm: initialState.paymentForm,
  }))
  .handleAction(actions.openCreatePassForm, (state, { payload: { defaultValues } }) => ({
    ...state,
    passForm: {
      isActive: true,
      defaultValues: {
        contact: state.params.contact,
        createdAt: state.params.activeDate,
        isActive: false,
        ...defaultValues,
      },
    },
  }))
  .handleAction(actions.closePassForm, state => ({
    ...state,
    passForm: initialState.passForm,
  }))

export default reducer
