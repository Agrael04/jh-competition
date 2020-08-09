import { combineReducers } from 'redux'

import checkDialog from './check-dialog'
import clientSuggester from './client-suggester'
import schedule from './schedule'
import records from './records'

export default () =>
  combineReducers({
    checkDialog,
    clientSuggester,
    schedule,
    records,
  })
