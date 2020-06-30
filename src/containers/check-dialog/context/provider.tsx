import React from 'react'

import { Context } from './index'
import {
  reducer,
  IReducerState,
} from './reducer'

import * as rawActions from './actions'

interface IProps {
  children: React.ReactChild | React.ReactChild[],
  initialState: IReducerState
}

type actionKeys = keyof typeof rawActions

export function Provider({ children, initialState }: IProps) {
  const [state, dispatch] = React.useReducer(reducer, initialState)

  const actions = React.useMemo(() => {
    function bindActionCreator(actionCreator: (...args: any[]) => any, dispatcher: typeof dispatch) {
      return function(this: any) {
        return dispatcher(
          actionCreator.apply(
            this as any, (arguments as unknown) as any[])
        )
      }
    }

    const newActions: any = {}
    const keys = Object.keys(rawActions) as actionKeys[]

    keys.forEach(key => {
      newActions[key] = bindActionCreator(rawActions[key], dispatch)
    })

    return newActions as typeof rawActions
  }, [dispatch])

  return (
    <Context.Provider value={{ state, actions }}>
      {children}
    </Context.Provider>
  )
}
