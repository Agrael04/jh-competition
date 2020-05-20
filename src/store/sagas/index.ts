import { all } from 'redux-saga/effects'

import checkDialog from './check-dialog'
import schedule from './schedule'

export default function*() {
  yield all([
    checkDialog(),
    schedule(),
  ])
}
