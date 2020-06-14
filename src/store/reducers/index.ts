import { combineReducers } from 'redux'

import checkDialog from './check-dialog'
import schedule from './schedule'

export default () =>
  combineReducers({
    schedule,
    checkDialog,
  })
