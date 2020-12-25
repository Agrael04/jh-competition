import { combineReducers } from 'redux'

import ui from './ui/reducer'

export default function root() {
  return combineReducers({
    ui,
  })
}
