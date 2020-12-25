import { combineReducers } from 'redux'

import dialogs from './dialogs/reducer'
import pages from './pages/reducer'

export default combineReducers({
  dialogs,
  pages,
})

