import { all } from 'redux-saga/effects'

import clientSuggester from './client-suggester'
import page from './page'

export default function* root() {
  yield all([
    clientSuggester(),
    page(),
  ])
}
