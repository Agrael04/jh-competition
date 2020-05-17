import { all } from 'redux-saga/effects'

import clientSuggester from './client-suggester'
import page from './page'
import trainingDialog from './training-dialog'
import checkDialog from './check-dialog'

export default function* root() {
  yield all([
    clientSuggester(),
    page(),
    trainingDialog(),
    checkDialog(),
  ])
}
