import { all, put, takeLatest, select } from 'redux-saga/effects'
import { BSON } from 'mongodb-stitch-browser-sdk'

import { actions } from 'store/actions/schedule'
import constants from 'store/constants/schedule'

import { IStoreState } from 'store'

export function* openCreateDialog(action: ReturnType<typeof actions.page.openCreateDialog>) {
  try {
    const date = yield select((state: IStoreState) => state.schedule.page.currentDate)
    const gym = yield select((state: IStoreState) => state.schedule.page.currentGym)

    const training = {
      _id: new BSON.ObjectID(),
      startTime: action.payload.time,
      resource: action.payload.resource,
      date,
      gym,
    }

    yield put(actions.trainingDialog.open('create', training, []))
  } catch (error) {
    console.log(error)
  }
}

export function* openUpdateDialog(action: ReturnType<typeof actions.page.openUpdateDialog>) {
  try {
    const training = action.payload.training
    delete training.__typename
    const records = action.payload.records
    records.forEach((r: any) => delete r.__typename)
    yield put(actions.trainingDialog.open('update', training, records))
  } catch (error) {
    console.log(error)
  }
}

function* watchOpenCreateDialog() {
  yield takeLatest(constants.page.OPEN_CREATE_TRAINING_DIALOG, openCreateDialog)
}

function* watchOpenUpdateDialog() {
  yield takeLatest(constants.page.OPEN_UPDATE_TRAINING_DIALOG, openUpdateDialog)
}

export default function* root() {
  yield all([
    watchOpenCreateDialog(),
    watchOpenUpdateDialog(),
  ])
}
