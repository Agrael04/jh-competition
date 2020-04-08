import { all, put, takeLatest, select } from 'redux-saga/effects'
import { BSON } from 'mongodb-stitch-browser-sdk'

import { actions } from 'store/actions/schedule'
import constants from 'store/constants/schedule'

import { IStoreState } from 'store'

export function* openCreateTrainingDialog(action: ReturnType<typeof actions.page.openCreateTrainingDialog>) {
  try {
    const date = yield select((state: IStoreState) => state.schedule.page.activeDate)
    const gym = yield select((state: IStoreState) => state.schedule.page.activeGym)

    const training = {
      _id: new BSON.ObjectID(),
      startTime: action.payload.time,
      endTime: action.payload.time + 2,
      resource: { link: action.payload.resource },
      date,
      gym: { link: gym },
    }

    yield put(actions.trainingDialog.open('create', training, []))
  } catch (error) {
    console.log(error)
  }
}

export function* openUpdateTrainingDialog(action: ReturnType<typeof actions.page.openUpdateTrainingDialog>) {
  try {
    const training = {
      _id: action.payload.training._id,

      gym: { link: action.payload.training.gym._id },
      resource: { link: action.payload.training.resource._id },
      trainer: { link: action.payload.training.trainer._id },

      date: action.payload.training.date,
      startTime: action.payload.training.startTime,
      endTime: action.payload.training.endTime,

      name: action.payload.training.name,
      type: action.payload.training.type,
      note: action.payload.training.note,
    }

    const records = action.payload.records
    records.forEach((r: any) => delete r.__typename)
    yield put(actions.trainingDialog.open('update', training, records))
  } catch (error) {
    console.log(error)
  }
}

export function* openAddTrainerDialog(action: ReturnType<typeof actions.page.openAddTrainerDialog>) {
  try {
    const date = yield select((state: IStoreState) => state.schedule.page.activeDate)
    const gym = yield select((state: IStoreState) => state.schedule.page.activeGym)

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
