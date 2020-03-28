import { useMemo } from 'react'
import { useDispatch } from 'react-redux'
import { bindActionCreators } from 'redux'

import schedule from './schedule'

const actions = {
  schedule,
}

export default actions

/* GET RID OF useActions hook */

export const useActions = () => {
  const dispatch = useDispatch()

  const result = useMemo(
    () => ({
      schedule: {
        clientSuggester: bindActionCreators(schedule.clientSuggester, dispatch),
        page: bindActionCreators(schedule.page, dispatch),
        trainingDialog: bindActionCreators(schedule.trainingDialog, dispatch),
      },
    }),
    [dispatch]
  )

  return result
}
