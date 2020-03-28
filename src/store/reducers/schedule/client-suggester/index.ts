import constants from 'store/constants/schedule/client-suggester'

import { ISearchedTrainee } from 'interfaces/trainee'

export interface IState {
  loading: boolean
  options: ISearchedTrainee[]
}

const initialState: IState = {
  loading: false,
  options: [],
}

export default (state = initialState, { type, payload }: { type: string, payload: any }): IState => {
  switch (type) {
    case constants.SEARCH: {
      return {
        loading: true,
        options: [],
      }
    }

    case constants.SEARCH_SUCCESS: {
      return {
        loading: false,
        options: payload.options,
      }
    }

    case constants.SEARCH_CANCEL: {
      return {
        loading: false,
        options: [],
      }
    }

    default:
      return state
  }
}
