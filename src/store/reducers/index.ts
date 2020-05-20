import { combineReducers } from 'redux'

import schedule from './schedule'
import checkDialog from './check-dialog'

export default () =>
  combineReducers({
    schedule,
    checkDialog,
  })
