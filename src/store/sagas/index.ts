import { all } from 'redux-saga/effects'

import schedule from './schedule'

export default function* root() {
  yield all([
    schedule(),
  ])
}
