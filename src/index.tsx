import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import { MuiPickersUtilsProvider } from '@material-ui/pickers'
import ThemeProvider from '@material-ui/styles/ThemeProvider'
import MomentUtils from '@date-io/moment'
import 'moment/locale/uk'

import { DndProvider } from 'react-dnd'
import HTML5Backend from 'react-dnd-html5-backend'

import store from './store'
import theme from './theme'
import * as serviceWorker from './serviceWorker'
import './index.css'

import Routes from './routes'

ReactDOM.render((
  <MuiPickersUtilsProvider utils={MomentUtils} locale='uk'>
    <ThemeProvider theme={theme}>
      <Provider store={store}>
        <DndProvider backend={HTML5Backend}>
          <BrowserRouter>
            <Routes />
          </BrowserRouter>
        </DndProvider>
      </Provider>
    </ThemeProvider>
  </MuiPickersUtilsProvider>
), document.getElementById('root'))

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister()
