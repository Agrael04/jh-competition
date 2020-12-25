import { combineReducers } from 'redux'

import page from './page/reducer'
import addTrainerDialog from './add-trainer-dialog/reducer'
import trainingDialog from './training-dialog/reducer'

export default combineReducers({
  page,
  addTrainerDialog,
  trainingDialog,
})
