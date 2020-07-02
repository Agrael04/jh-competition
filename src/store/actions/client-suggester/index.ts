import { createAsyncAction } from 'typesafe-actions'

import { ISearchedTrainee } from 'interfaces/trainee'

export const searchUsersAsync = createAsyncAction(
  [
    'clientSuggester/SEARCH',
    (filter: string) => ({ filter }),
  ],
  [
    'clientSuggester/SEARCH_SUCCESS',
    (options: ISearchedTrainee[]) => ({ options }),
  ],
  [
    'clientSuggester/SEARCH_FAILURE',
    (error: Error) => ({ error }),
  ],
  'clientSuggester/SEARCH_CANCEL'
)()

export const search = searchUsersAsync.request

export const searchSuccess = searchUsersAsync.success

export const searchCancel = searchUsersAsync.cancel

export const actions = {
  search,
  searchSuccess,
  searchCancel,
}

export default actions
