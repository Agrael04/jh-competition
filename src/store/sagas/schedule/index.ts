import { all } from 'redux-saga/effects'

import page from './page'
import trainingDialog from './training-dialog'

export default function* root() {
  yield all([
    page(),
    trainingDialog(),
  ])
}
