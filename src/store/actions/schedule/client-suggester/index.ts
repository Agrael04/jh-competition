import constants from 'store/constants/schedule/client-suggester'

import { ISearchedTrainee } from 'interfaces/trainee'

export const search = (filter: string) => {
  return ({
    type: constants.SEARCH,
    payload: { filter },
  })
}

export const searchSuccess = (options: ISearchedTrainee[]) => ({
  type: constants.SEARCH_SUCCESS,
  payload: { options },
})

export const searchCancel = () => ({
  type: constants.SEARCH_CANCEL,
})

export const actions = {
  search,
  searchSuccess,
  searchCancel,
}

export default actions
