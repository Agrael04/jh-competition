import { all, put, takeLatest, select } from 'redux-saga/effects'

import actions from 'store/actions'

import { IStoreState } from 'store'

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

function* watchOpenCheckDialog() {
  yield takeLatest(actions.schedule.trainingDialog.openCheckDialog, openCheckDialog)
}

export default function* root() {
  yield all([
    watchOpenCheckDialog(),
  ])
}
