import { all, call, put, takeLatest, delay } from 'redux-saga/effects'

import searchUsers from 'api/mongodb'
import PromiseResponse from 'interfaces/promise-response'

import { actions } from 'store/actions/schedule'
import constants from 'store/constants/schedule'

export function* searchTrainees(action: ReturnType<typeof actions.clientSuggester.search>) {
  try {
    yield delay(500)

    if (!action.payload.filter) {
      yield put(actions.clientSuggester.searchCancel())
      return
    }

    const res: PromiseResponse<typeof searchUsers> = yield call(
      searchUsers,
      action.payload.filter
    )

    yield put(actions.clientSuggester.searchSuccess(res))
  } catch (error) {
    console.log(error)
  }
}

function* watchSearchTrainees() {
  yield takeLatest(constants.clientSuggester.SEARCH, searchTrainees)
}

export default function* root() {
  yield all([
    watchSearchTrainees(),
  ])
}
