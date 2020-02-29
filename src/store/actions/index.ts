import { useMemo } from 'react'
import { useDispatch } from 'react-redux'
import { bindActionCreators } from 'redux'

import schedule from './schedule'
import trainings from './trainings'

const actions = {
  schedule,
  trainings,
}

export default actions

export const useActions = () => {
  const dispatch = useDispatch()

  const boundActions = useMemo(() => {
    const obj = { ...actions }

    Object.keys(actions).forEach(key => {
      (obj as any)[key] = bindActionCreators((actions as any)[key], dispatch)
    })

    return obj
  }, [dispatch])

  return boundActions
}
