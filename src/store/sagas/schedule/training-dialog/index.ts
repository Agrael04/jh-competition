import { all, put, takeLatest, select } from 'redux-saga/effects'
import { BSON } from 'mongodb-stitch-browser-sdk'

import { actions } from 'store/actions/schedule'
import constants from 'store/constants/schedule'

import { IStoreState } from 'store'

export function* openResource(action: ReturnType<typeof actions.trainingDialog.openResource>) {
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
      }
      mode = 'create'
    }

    yield put(actions.trainingDialog.setResource(resource, mode))
  } catch (error) {
    console.log(error)
  }
}

export function* openRecord(action: ReturnType<typeof actions.trainingDialog.openRecord>) {
  try {
    const { trainingId } = yield select((state: IStoreState) => ({
      trainingId: state.schedule.trainingDialog.trainingForm._id,
    }))

    let record: any = null
    let mode: 'create' | 'update' | null = null

    if (action.payload.record) {
      record = action.payload.record
      mode = 'update'
    } else {
      record = {
        _id: new BSON.ObjectID(),
        contact: null,
        attendant: null,
        resource: null,
        status: '',
        training: { link: trainingId },
      }
      mode = 'create'
    }

    yield put(actions.trainingDialog.setRecord(record, mode))
  } catch (error) {
    console.log(error)
  }
}

function* watchOpenResource() {
  yield takeLatest(constants.trainingDialog.OPEN_RESOURCE, openResource)
}

function* watchOpenRecord() {
  yield takeLatest(constants.trainingDialog.OPEN_RECORD, openRecord)
}

export default function* root() {
  yield all([
    watchOpenResource(),
    watchOpenRecord(),
  ])
}
