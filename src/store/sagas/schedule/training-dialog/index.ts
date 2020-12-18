import { all, put, takeLatest, select } from 'typed-redux-saga'

import actions from 'store/actions'

import { IStoreState } from 'store'

export function* openCheckDialog(action: ReturnType<typeof actions.schedule.trainingDialog.openCheckDialog>) {
  try {
    const { activeDate, activeGym, contact } = yield* select((state: IStoreState) => ({
      activeDate: state.schedule.page.filters.date,
      activeGym: state.schedule.page.filters.gym,
      contact: state.schedule.trainingDialog.recordForm.defaultValues?.contact?.link,
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
