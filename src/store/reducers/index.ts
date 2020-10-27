import { combineReducers } from 'redux'

import checkDialog from './check-dialog'
import schedule from './schedule'
import records from './records'
import clients from './clients'

export default function root() {
  return combineReducers({
    checkDialog,
    schedule,
    records,
    clients,
  })
}
