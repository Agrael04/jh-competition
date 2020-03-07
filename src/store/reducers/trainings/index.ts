import constants from 'store/constants/trainings'

import ITraining from 'interfaces/training'

export interface IState {
  data: ITraining[],
  loading: boolean,
}

const initialState: IState = {
  data: [],
  loading: false,
}

export default (state = initialState, { type, payload }: { type: string, payload: any }): IState => {
  switch (type) {
    case constants.READ_TRAININGS: {
      return {
        ...state,
        data: [],
        loading: true,
      }
    }

    case constants.READ_TRAININGS_SUCCESS: {
      return {
        ...state,
        data: payload.data,
        loading: false,
      }
    }

    default:
      return state
  }
}
