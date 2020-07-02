import { useMemo } from 'react'
import { useDispatch } from 'react-redux'
import { bindActionCreators } from 'redux'

import schedule from './schedule'
import clientSuggester from './client-suggester'

export const actions = {
  clientSuggester,
  schedule,
}

export default actions

/* GET RID OF useActions hook */

export const useActions = () => {
  const dispatch = useDispatch()

  const result = useMemo(
    () => ({
      schedule: {
        page: bindActionCreators(schedule.page, dispatch),
        addTrainerDialog: bindActionCreators(schedule.addTrainerDialog, dispatch),
        trainingDialog: bindActionCreators(schedule.trainingDialog, dispatch),
      },
      clientSuggester: bindActionCreators(clientSuggester, dispatch),
    }),
    [dispatch]
  )

  return result
}
