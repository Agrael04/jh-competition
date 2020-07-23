import { all, put, takeLatest, select, delay } from 'redux-saga/effects'
import { BSON } from 'mongodb-stitch-browser-sdk'

import { actions } from 'store/actions/schedule'

import { IStoreState } from 'store'
import times from 'data/times'

export function* openCreateTrainingDialog(action: ReturnType<typeof actions.page.openCreateTrainingDialog>) {
  try {
    const date: Date = yield select((state: IStoreState) => state.schedule.page.activeDate)
    const gym: string = yield select((state: IStoreState) => state.schedule.page.activeGym)

    const _id = new BSON.ObjectID().toString()

    yield put(actions.trainingDialog.open('create', _id))

    const training = {
      _id,
      gym: { link: gym },
      date,
      traineesAmount: 1,
    }

    const resource = {
      startTime: action.payload.time,
      endTime: action.payload.time + 2,
      resource: { link: action.payload.resource },
    }

    yield put(actions.trainingDialog.initialize(training))
    yield put(actions.trainingDialog.openCreateResourceForm(resource))
  } catch (error) {
    console.log(error)
  }
}

export function* openAddTrainerDialog() {
  try {
    const date: Date = yield select((state: IStoreState) => state.schedule.page.activeDate)
    const gym: string = yield select((state: IStoreState) => state.schedule.page.activeGym)

    yield put(actions.addTrainerDialog.open(gym, date))
  } catch (error) {
    console.log(error)
  }
}

export function* checkActiveTime() {
  try {
    const activeTime: number = yield select((state: IStoreState) => state.schedule.page.activeTime)

    const date = new Date()
    const hours = date.getHours()
    const minutes = date.getMinutes()
    const timeFrame = `${hours}:${minutes < 30 ? '00' : '30'}`

    const time = times.find(t => t.label === timeFrame)!

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
  yield takeLatest(actions.page.openCreateTrainingDialog, openCreateTrainingDialog)
}

function* watchOpenAddTrainerDialog() {
  yield takeLatest(actions.page.openAddTrainerDialog, openAddTrainerDialog)
}

function* watchCheckActiveTime() {
  yield takeLatest(actions.page.checkActiveTime, checkActiveTime)
}

export default function* root() {
  yield all([
    watchOpenCreateTrainingDialog(),
    watchOpenAddTrainerDialog(),
    watchCheckActiveTime(),
  ])
}
