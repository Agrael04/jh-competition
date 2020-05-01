import { all, put, takeLatest, select, delay } from 'redux-saga/effects'
import { BSON } from 'mongodb-stitch-browser-sdk'

import { actions } from 'store/actions/schedule'
import constants from 'store/constants/schedule'

import { IStoreState } from 'store'
import times from 'data/times'

export function* openCreateTrainingDialog(action: ReturnType<typeof actions.page.openCreateTrainingDialog>) {
  try {
    const date = yield select((state: IStoreState) => state.schedule.page.activeDate)
    const gym = yield select((state: IStoreState) => state.schedule.page.activeGym)

    const _id = new BSON.ObjectID().toString()

    yield put(actions.trainingDialog.open('create', _id))

    const training = {
      _id,
      gym: { link: gym },
      date,
    }

    const resource = {
      _id: new BSON.ObjectID().toString(),
      startTime: action.payload.time,
      endTime: action.payload.time + 2,
      resource: { link: action.payload.resource },
      trainer: undefined,
      records: { link: [] },
      training: { link: _id },
    }

    yield put(actions.trainingDialog.initialize(training, resource))
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

export function* checkActiveTime(action: ReturnType<typeof actions.page.checkActiveTime>) {
  try {
    const activeTime = yield select((state: IStoreState) => state.schedule.page.activeTime)

    const date = new Date()
    const hours = date.getHours()
    const minutes = date.getMinutes()
    const timeFrame = `${hours}:${minutes < 30 ? '00' : '30'}`

    const time = times.find(t => t.label === timeFrame)

    if (time?.id !== activeTime) {
      yield put(actions.page.setActiveTime(time?.id))
    }

    yield delay(60000)

    yield put(actions.page.checkActiveTime())
  } catch (error) {
    console.log(error)
  }
}

function* watchOpenCreateTrainingDialog() {
  yield takeLatest(constants.page.OPEN_CREATE_TRAINING_DIALOG, openCreateTrainingDialog)
}

function* watchOpenAddTrainerDialog() {
  yield takeLatest(constants.page.OPEN_ADD_TRAINER_DIALOG, openAddTrainerDialog)
}

function* watchCheckActiveTime() {
  yield takeLatest(constants.page.CHECK_ACTIVE_TIME, checkActiveTime)
}

export default function* root() {
  yield all([
    watchOpenCreateTrainingDialog(),
    watchOpenAddTrainerDialog(),
    watchCheckActiveTime(),
  ])
}
