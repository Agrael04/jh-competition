import { all } from 'redux-saga/effects'

import ui from './ui/sagas'

export default function* root() {
  yield all([
    ui(),
  ])
}
