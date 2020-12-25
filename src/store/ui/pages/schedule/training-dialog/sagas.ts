import { all, put, takeLatest, select } from 'typed-redux-saga'

import { actions as checkDialogActions } from 'store/ui/dialogs/check-dialog/actions'
import { actions } from './actions'

import { IStoreState } from 'store'

export function* openCheckDialog() {
  try {
    const { activeDate, activeGym, contact } = yield* select((state: IStoreState) => ({
      activeDate: state.ui.pages.schedule.page.filters.date,
      activeGym: state.ui.pages.schedule.page.filters.gym,
      contact: state.ui.pages.schedule.trainingDialog.recordForm.defaultValues?.contact?.link,
    }))

    if (contact) {
      yield put(checkDialogActions.openDialog(activeDate, activeGym, contact))
    }
  } catch (error) {
    console.log(error)
  }
}

function* watchOpenCheckDialog() {
  yield takeLatest(actions.openCheckDialog, openCheckDialog)
}

export default function* root() {
  yield all([
    watchOpenCheckDialog(),
  ])
}
