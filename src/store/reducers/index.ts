import { combineReducers } from 'redux'

import checkDialog from './check-dialog'
import schedule from './schedule'
import records from './records'

export default () =>
  combineReducers({
    checkDialog,
    schedule,
    records,
  })
