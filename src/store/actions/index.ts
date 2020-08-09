import { useMemo } from 'react'
import { useDispatch } from 'react-redux'
import { bindActionCreators } from 'redux'

import checkDialog from './check-dialog'
import clientSuggester from './client-suggester'
import schedule from './schedule'
import records from './records'

export const actions = {
  checkDialog,
  clientSuggester,
  schedule,
  records,
}

export default actions

/* GET RID OF useActions hook */

export const useActions = () => {
  const dispatch = useDispatch()

  const result = useMemo(
    () => ({
      checkDialog: bindActionCreators(checkDialog, dispatch),
      clientSuggester: bindActionCreators(clientSuggester, dispatch),
      schedule: {
        page: bindActionCreators(schedule.page, dispatch),
        addTrainerDialog: bindActionCreators(schedule.addTrainerDialog, dispatch),
        trainingDialog: bindActionCreators(schedule.trainingDialog, dispatch),
      },
      records: {
        page: bindActionCreators(records.page, dispatch),
      },
    }),
    [dispatch]
  )

  return result
}
