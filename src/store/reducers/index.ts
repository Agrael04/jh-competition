import { combineReducers } from 'redux'

import clientSuggester from './client-suggester'
import schedule from './schedule'

export default () =>
  combineReducers({
    clientSuggester,
    schedule,
  })
