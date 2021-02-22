import { all, put, takeLatest, select } from 'typed-redux-saga'

import { actions as checkDialogActions } from 'store/ui/dialogs/check-dialog/actions'
import { actions } from './actions'

import { IStoreState } from 'store'

export function* openCheckDialog(
  action: ReturnType<typeof actions.openCheckDialog>
) {
  try {
    const { activeDate, activeGym } = yield* select((state: IStoreState) => ({
      activeDate: state.ui.pages.schedule.page.filters.date,
      activeGym: state.ui.pages.schedule.page.filters.gym,
    }))

    yield put(checkDialogActions.openDialog(activeDate, activeGym, action.payload.contact))
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
