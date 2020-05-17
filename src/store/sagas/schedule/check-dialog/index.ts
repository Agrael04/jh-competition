import { all, put, takeLatest, select } from 'redux-saga/effects'
import { BSON } from 'mongodb-stitch-browser-sdk'

import { actions } from 'store/actions/schedule'
import constants from 'store/constants/schedule'

import { IStoreState } from 'store'

export function* openPass(action: ReturnType<typeof actions.checkDialog.openPass>) {
  try {
    const { contact, activeDate } = yield select((state: IStoreState) => ({
      contact: state.schedule.checkDialog.contact,
      activeDate: state.schedule.page.activeDate,
    }))

    let pass: any
    let mode: 'create' | 'update' | null = null

    if (action.payload.pass) {
      pass = action.payload.pass
      mode = 'update'
    } else {
      pass = {
        _id: new BSON.ObjectID(),
        contact: { link: contact },
        type: null,
        size: null,
        capacity: null,
        createdAt: activeDate,
        activatedAt: null,
        activatesIn: null,
        expiresIn: null,
      }
      mode = 'create'
    }

    yield put(actions.checkDialog.setPass(pass, mode))
  } catch (error) {
    console.log(error)
  }
}

function* watchOpenPass() {
  yield takeLatest(constants.checkDialog.OPEN_PASS, openPass)
}

export default function* root() {
  yield all([
    watchOpenPass(),
  ])
}
