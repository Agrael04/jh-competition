import { useContextSelector } from 'use-context-selector'

import { Context, IContext } from './index'

export function useContext<T>(selector: (context: IContext) => T) {
  return useContextSelector(Context, selector)
}
