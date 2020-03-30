import { all, put, takeLatest, select } from 'redux-saga/effects'
import { BSON } from 'mongodb-stitch-browser-sdk'

import { actions } from 'store/actions/schedule'
import constants from 'store/constants/schedule'

import { IStoreState } from 'store'

export function* openCreateTrainingDialog(action: ReturnType<typeof actions.page.openCreateTrainingDialog>) {
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

export function* openUpdateTrainingDialog(action: ReturnType<typeof actions.page.openUpdateTrainingDialog>) {
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

export function* openAddTrainerDialog(action: ReturnType<typeof actions.page.openAddTrainerDialog>) {
  try {
    const date = yield select((state: IStoreState) => state.schedule.page.currentDate)
    const gym = yield select((state: IStoreState) => state.schedule.page.currentGym)

    yield put(actions.addTrainerDialog.open(gym, date))
  } catch (error) {
    console.log(error)
  }
}

function* watchOpenCreateTrainingDialog() {
  yield takeLatest(constants.page.OPEN_CREATE_TRAINING_DIALOG, openCreateTrainingDialog)
}

function* watchOpenUpdateTrainingDialog() {
  yield takeLatest(constants.page.OPEN_UPDATE_TRAINING_DIALOG, openUpdateTrainingDialog)
}

function* watchOpenAddTrainerDialog() {
  yield takeLatest(constants.page.OPEN_ADD_TRAINER_DIALOG, openAddTrainerDialog)
}

export default function* root() {
  yield all([
    watchOpenCreateTrainingDialog(),
    watchOpenUpdateTrainingDialog(),
    watchOpenAddTrainerDialog(),
  ])
}
