import { all } from 'redux-saga/effects'

import schedule from './schedule'
import trainings from './trainings'

export default function*() {
  yield all([
    schedule(),
    trainings(),
  ])
}
