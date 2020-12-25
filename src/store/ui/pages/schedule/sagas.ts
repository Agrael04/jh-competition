import { all } from 'redux-saga/effects'

import page from './page/sagas'
import trainingDialog from './training-dialog/sagas'

export default function* root() {
  yield all([
    page(),
    trainingDialog(),
  ])
}
