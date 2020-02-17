import { createStore, applyMiddleware, compose } from 'redux'
// import createSagaMiddleware from 'redux-saga'

// import { routerMiddleware } from 'connected-react-router'
// import { createBrowserHistory } from 'history'

import reducer from './reducers'
// import saga from './sagas'
// import { useActions } from './actions'

// const history = createBrowserHistory()

declare global {
  interface Window { __REDUX_DEVTOOLS_EXTENSION_COMPOSE__: any }
}

// const composeEnhancers =
//   (window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ &&
//     window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
//       trace: true,
//       traceLimit: 25,
//     })) ||
//   compose

// const sagaMiddleware = createSagaMiddleware()

// const middlewares = applyMiddleware(
//   sagaMiddleware,
//   routerMiddleware(history)
// )

const store = createStore(
  reducer()
  // process.env.REDUX_DEVTOOLS ? composeEnhancers(middlewares) : middlewares
)

// sagaMiddleware.run(saga)

export type IStoreState = ReturnType<ReturnType<typeof reducer>>

// export { useActions }

// export { history }

export default store
