import { combineReducers } from 'redux'

import schedule from './schedule/reducer'
import records from './records/reducer'
import clients from './clients/reducer'

export default combineReducers({
  schedule,
  records,
  clients,
})

