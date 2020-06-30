import { createContext } from 'use-context-selector'

import { Provider } from './provider'
import { useContext } from './use-context'

import { IReducerState } from './reducer'
import * as rawActions from './actions'

export interface IContext {
  state: IReducerState
  actions: typeof rawActions
}

export const Context = createContext<IContext>({} as any)

export { Provider }
export { useContext }
