import { all } from 'redux-saga/effects'

import schedule from './schedule/sagas'

export default function* root() {
  yield all([
    schedule(),
  ])
}
