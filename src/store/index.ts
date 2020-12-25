import { createStore, applyMiddleware, compose } from 'redux'
import { TypedUseSelectorHook, useSelector as useReduxSelector, useDispatch } from 'react-redux'
import createSagaMiddleware from 'redux-saga'

// import { routerMiddleware } from 'connected-react-router'
// import { createBrowserHistory } from 'history'

import reducer from './reducer'
import saga from './sagas'

// const history = createBrowserHistory()

declare global {
  interface Window { __REDUX_DEVTOOLS_EXTENSION_COMPOSE__: any }
}

const composeEnhancers =
  (window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
      trace: true,
      traceLimit: 25,
    })) ||
  compose

const sagaMiddleware = createSagaMiddleware()

const middlewares = applyMiddleware(
  sagaMiddleware
  // routerMiddleware(history)
)

const store = createStore(
  reducer(),
  composeEnhancers(middlewares)
)

sagaMiddleware.run(saga)

export type IStoreState = ReturnType<ReturnType<typeof reducer>>

export const useSelector: TypedUseSelectorHook<IStoreState> = useReduxSelector

export { useDispatch }

// export { history }

export default store
