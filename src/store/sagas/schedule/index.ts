import { all, call, put, takeLatest, delay, select } from 'redux-saga/effects'
import { BSON } from 'mongodb-stitch-browser-sdk'

import searchUsers from 'api/mongodb'
import PromiseResponse from 'interfaces/promise-response'

import actions from 'store/actions/schedule'
import constants from 'store/constants/schedule'

export function* searchTrainees(action: ReturnType<typeof actions.searchTrainees>) {
  try {
    yield delay(500)

    if (!action.payload.filter) {
      yield put(actions.searchTraineesCancel())
      return
    }

    const res: PromiseResponse<typeof searchUsers> = yield call(
      searchUsers,
      action.payload.filter
    )

    yield put(actions.searchTraineesSuccess(res))
  } catch (error) {
    console.log(error)
  }
}

export function* openCreateDialog(action: ReturnType<typeof actions.openCreateDialog>) {
  try {
    const date = yield select(state => state.schedule.currentDate)
    const gym = yield select(state => state.schedule.currentGym)

    const training = {
      _id: new BSON.ObjectID(),
      time: action.payload.time,
      resource: action.payload.resource,
      date,
      gym,
    }

    yield put(actions.openTrainingDialog('create', training, []))
  } catch (error) {
    console.log(error)
  }
}

export function* openUpdateDialog(action: ReturnType<typeof actions.openUpdateDialog>) {
  try {
    const training = action.payload.training
    delete training.__typename
    const records = action.payload.records
    records.forEach((r: any) => delete r.__typename)
    yield put(actions.openTrainingDialog('update', training, records))
  } catch (error) {
    console.log(error)
  }
}

function* watchSearchTrainees() {
  yield takeLatest(constants.SEARCH_TRAINEES, searchTrainees)
}

function* watchOpenCreateDialog() {
  yield takeLatest(constants.OPEN_CREATE_TRAINING_DIALOG, openCreateDialog)
}

function* watchOpenUpdateDialog() {
  yield takeLatest(constants.OPEN_UPDATE_TRAINING_DIALOG, openUpdateDialog)
}

export default function* root() {
  yield all([
    watchSearchTrainees(),
    watchOpenCreateDialog(),
    watchOpenUpdateDialog(),
  ])
}
