import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import { MuiPickersUtilsProvider } from '@material-ui/pickers'
import MomentUtils from '@date-io/moment'
import 'moment/locale/uk'

import { DndProvider } from 'react-dnd'
import Backend from 'react-dnd-html5-backend'

import store from './store'
import * as serviceWorker from './serviceWorker'
import './index.css'

import Routes from './routes'

console.log(process.env)

ReactDOM.render((
  <DndProvider backend={Backend}>
    <MuiPickersUtilsProvider utils={MomentUtils} locale='uk'>
      <Provider store={store}>
        <BrowserRouter>
          <Routes />
        </BrowserRouter>
      </Provider>
    </MuiPickersUtilsProvider>
  </DndProvider>
), document.getElementById('root'))

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister()
