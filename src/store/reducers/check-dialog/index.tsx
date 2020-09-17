import { ActionType, createReducer } from 'typesafe-actions'
import actions from 'store/actions/check-dialog'

import { ICheckPositionForm } from 'interfaces/check-position'

type IAction = ActionType<typeof actions>

export interface IState {
  opened: boolean
  params: {
    activeDate: Date
    activeGym: string
    contact: {
      link: string
    } | null
  }

  positionForm: {
    isActive: boolean
    mode: 'create' | 'update' | null
    position: Partial<ICheckPositionForm> | null
  }

  openedPassForm: boolean
}

const initialState = {
  opened: false,
  params: {
    activeDate: new Date(),
    activeGym: '',
    contact: null,
  },

  positionForm: {
    isActive: false,
    mode: null,
    position: null,
  },

  openedPassForm: false,
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
  .handleAction(actions.openPassForm, state => ({
    ...state,
    openedPassForm: true,
  }))
  .handleAction(actions.closePassForm, state => ({
    ...state,
    openedPassForm: false,
  }))
  .handleAction(actions.openCreatePositionForm, (state, { payload: { position } }) => ({
    ...state,
    positionForm: {
      position: {
        contact: state.params.contact!,
        date: state.params.activeDate,
        type: position?.type,
        service: position?.service,
        priceAmount: null,
        priceType: 'money',
      },
      mode: 'create',
      isActive: true,
    },
  }))
  .handleAction(actions.openUpdatePositionForm, (state, { payload: { position } }) => ({
    ...state,
    positionForm: {
      position: {
        _id: position._id,
        priceType: position.priceType || 'money',
        priceAmount: position.priceAmount,
        type: position.type,
        service: position.service,
      },
      mode: 'update',
      isActive: true,
    },
  }))
  .handleAction(actions.closePositionForm, state => ({
    ...state,
    positionForm: initialState.positionForm,
  }))

export default reducer
