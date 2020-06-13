import { createContext } from 'use-context-selector'
import { ITrainingPassForm } from 'interfaces/training-pass'

import { Provider } from './provider'
import { useContext } from './use-context'

export interface IState {
  passForm: ITrainingPassForm | null
}

export interface IContext {
  state: IState
  updateForm: (pass: Partial<ITrainingPassForm>) => void
}

export const Context = createContext<IContext>({} as any)

export { Provider }
export { useContext }
