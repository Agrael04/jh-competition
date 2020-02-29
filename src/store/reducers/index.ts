import { combineReducers } from 'redux'

import schedule from './schedule'
import trainings from './trainings'

export default () =>
  combineReducers({
    schedule,
    trainings,
  })
