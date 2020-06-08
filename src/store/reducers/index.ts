import { combineReducers } from 'redux'

import checkDialog from './check-dialog'
import passForm from './pass-form'
import schedule from './schedule'

export default () =>
  combineReducers({
    schedule,
    passForm,
    checkDialog,
  })
