import { all, call, put, takeLatest, delay } from 'redux-saga/effects'

import searchUsers from '../../../api/mongodb'
import PromiseResponse from '../../../interfaces/promise-response'

import actions from '../../actions/schedule'
import constants from '../../constants/schedule'

export function* searchTrainees(action: ReturnType<typeof actions.searchTrainees>) {
  try {
    yield delay(500)

    const res: PromiseResponse<typeof searchUsers> = yield call(
      searchUsers,
      action.payload.filter
    )

    yield put(actions.searchTraineesSuccess(res))
  } catch (error) {
    console.log(error)
  }
}

function* watchSearchTrainees() {
  yield takeLatest(constants.SEARCH_TRAINEES, searchTrainees)
}

export default function*() {
  yield all([
    watchSearchTrainees(),
  ])
}
