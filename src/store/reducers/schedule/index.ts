import { combineReducers } from 'redux'

import page from './page'
import addTrainerDialog from './add-trainer-dialog'
import trainingDialog from './training-dialog'

export default combineReducers({
  page,
  addTrainerDialog,
  trainingDialog,
})
