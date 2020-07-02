import { all } from 'redux-saga/effects'

import clientSuggester from './client-suggester'
import schedule from './schedule'

export default function* () {
  yield all([
    clientSuggester(),
    schedule(),
  ])
}
