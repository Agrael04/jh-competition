import { all, put, takeLatest, select, delay } from 'typed-redux-saga'

import { actions as trainingDialogActions } from '../training-dialog/actions'
import { actions as addTrainerDialogActions } from '../add-trainer-dialog/actions'
import { actions } from './actions'

import { IStoreState } from 'store'
import times from 'data/times'

export function* openCreateTrainingDialog(
  action: ReturnType<typeof actions.openCreateTrainingDialog>
) {
  try {
    yield put(trainingDialogActions.open())

    const resource = {
      startTime: action.payload.time,
      endTime: action.payload.time + 1,
      resource: { link: action.payload.resource },
      type: 'RENT'
    }

    yield put(trainingDialogActions.openCreateTrainingForm(resource))
  } catch (error) {
    console.log(error)
  }
}

export function* openAddTrainerDialog() {
  try {
    yield put(addTrainerDialogActions.open())
  } catch (error) {
    console.log(error)
  }
}

export function* checkActiveTime() {
  try {
    const activeTime = yield* select((state: IStoreState) => state.ui.pages.schedule.page.activeTime)

    const date = new Date()
    const hours = date.getHours()
    const minutes = date.getMinutes()
    const timeFrame = `${hours}:${minutes < 30 ? '00' : '30'}`

    const time = times.find(t => t.label === timeFrame)!

    if (time?.id !== activeTime) {
      yield put(actions.setActiveTime(time?.id))
    }

    yield delay(60000)

    yield put(actions.checkActiveTime())
  } catch (error) {
    console.log(error)
  }
}

function* watchOpenCreateTrainingDialog() {
  yield takeLatest(actions.openCreateTrainingDialog, openCreateTrainingDialog)
}

function* watchOpenAddTrainerDialog() {
  yield takeLatest(actions.openAddTrainerDialog, openAddTrainerDialog)
}

function* watchCheckActiveTime() {
  yield takeLatest(actions.checkActiveTime, checkActiveTime)
}

export default function* root() {
  yield all([
    watchOpenCreateTrainingDialog(),
    watchOpenAddTrainerDialog(),
    watchCheckActiveTime(),
  ])
}
