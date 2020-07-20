import { all, put, takeLatest, select } from 'redux-saga/effects'
import { BSON } from 'mongodb-stitch-browser-sdk'

import actions from 'store/actions'

import { IStoreState } from 'store'

export function* openResource(action: ReturnType<typeof actions.schedule.trainingDialog.openResource>) {
  try {
    const { trainingId } = yield select((state: IStoreState) => ({
      trainingId: state.schedule.trainingDialog.trainingForm._id,
    }))

    let resource: any
    let mode: 'create' | 'update' | null = null

    if (action.payload.resource) {
      resource = action.payload.resource
      mode = 'update'
    } else {
      resource = {
        _id: new BSON.ObjectID(),
        resource: null,
        trainer: null,
        startTime: undefined,
        endTime: undefined,
        training: { link: trainingId },
        traineesAmount: undefined,
      }
      mode = 'create'
    }

    yield put(actions.schedule.trainingDialog.setResource(resource, mode))
  } catch (error) {
    console.log(error)
  }
}

export function* openCheckDialog(action: ReturnType<typeof actions.schedule.trainingDialog.openCheckDialog>) {
  try {
    const { activeDate, activeGym, contact } = yield select((state: IStoreState) => ({
      activeDate: state.schedule.page.activeDate,
      activeGym: state.schedule.page.activeGym,
      contact: state.schedule.trainingDialog.recordForm.record?.contact?.link,
    }))

    if (contact) {
      yield put(actions.checkDialog.openDialog(activeDate, activeGym, contact))
    }
  } catch (error) {
    console.log(error)
  }
}

function* watchOpenResource() {
  yield takeLatest(actions.schedule.trainingDialog.openResource, openResource)
}

function* watchOpenCheckDialog() {
  yield takeLatest(actions.schedule.trainingDialog.openCheckDialog, openCheckDialog)
}

export default function* root() {
  yield all([
    watchOpenResource(),
    watchOpenCheckDialog(),
  ])
}
