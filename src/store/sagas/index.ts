import { all } from 'redux-saga/effects'

import schedule from './schedule'

export default function*() {
  yield all([
    schedule(),
  ])
}
