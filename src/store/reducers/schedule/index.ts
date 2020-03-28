import { combineReducers } from 'redux'

import clientSuggester from './client-suggester'
import page from './page'
import trainingDialog from './training-dialog'

export default combineReducers({
  clientSuggester,
  page,
  trainingDialog,
})
