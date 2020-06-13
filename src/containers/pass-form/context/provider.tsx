import React from 'react'

import { ITrainingPassForm } from 'interfaces/training-pass'

import { Context } from './index'
import { reducer, IReducerState, updateForm as updateFormAction } from './reducer'

interface IProps {
  children: React.ReactChild | React.ReactChild[],
  initialState: IReducerState
}

export function Provider({ children, initialState }: IProps) {
  const [state, dispatch] = React.useReducer(reducer, initialState)

  const updateForm = React.useCallback(
    (pass: Partial<ITrainingPassForm>) => dispatch(updateFormAction(pass)),
    [dispatch]
  )

  return (
    <Context.Provider value={{ state, updateForm }}>
      {children}
    </Context.Provider>
  )
}
