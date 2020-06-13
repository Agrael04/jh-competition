import constants from 'store/constants/pass-form'

import { ITrainingPassForm } from 'interfaces/training-pass'

export interface IState {
  opened: boolean
  passForm: ITrainingPassForm | null
  passMode: 'create' | 'update' | null

  initialFilter: string
}

const initialState: IState = {
  opened: false,
  passForm: null,
  passMode: null,

  initialFilter: '',
}

export default (state = initialState, { type, payload }: { type: string, payload: any }): IState => {
  switch (type) {
    case constants.OPEN: {
      return {
        ...state,
        passForm: payload.pass,
        passMode: payload.mode,
        opened: true,
        initialFilter: payload.initialFilter,
      }
    }

    case constants.CLOSE: {
      return {
        ...state,
        ...initialState,
      }
    }

    default:
      return state
  }
}
