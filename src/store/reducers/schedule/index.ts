import { combineReducers } from 'redux'

import clientSuggester from './client-suggester'
import page from './page'
import addTrainerDialog from './add-trainer-dialog'
import trainingDialog from './training-dialog'
import checkDialog from './check-dialog'

export default combineReducers({
  clientSuggester,
  page,
  addTrainerDialog,
  trainingDialog,
  checkDialog,
})
