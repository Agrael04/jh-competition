import { all, put, takeLatest, select } from 'redux-saga/effects'
import { BSON } from 'mongodb-stitch-browser-sdk'

import { actions } from 'store/actions/schedule'
import constants from 'store/constants/schedule'

import { IStoreState } from 'store'

export function* openResource(action: ReturnType<typeof actions.trainingDialog.openResource>) {
  try {
    const { date, startTime, endTime } = yield select((state: IStoreState) => ({
      date: state.schedule.trainingDialog.trainingForm.date,
      startTime: state.schedule.trainingDialog.resourceForm?.startTime,
      endTime: state.schedule.trainingDialog.resourceForm?.endTime,
    }))

    let resource
    let mode: 'create' | 'update' | null = null

    if (action.payload._id) {
      resource = yield select((state: IStoreState) => state.schedule.trainingDialog.resources.find(r => r._id === action.payload._id))
      mode = 'update'
    } else {
      resource = {
        _id: new BSON.ObjectID(),
        resource: {
          link: '',
        },
        trainer: null,
        date,
        startTime,
        endTime,
      }
      mode = 'create'
    }

    yield put(actions.trainingDialog.setResource(resource, mode))
  } catch (error) {
    console.log(error)
  }
}

function* watchOpenResource() {
  yield takeLatest(constants.trainingDialog.OPEN_RESOURCE, openResource)
}

export default function* root() {
  yield all([
    watchOpenResource(),
  ])
}
