import { useCallback } from 'react'

import Dialog from '@material-ui/core/Dialog'

import Form from './form'

import { useSelector, useActions } from 'store'


const SchedulePage = () => {
  const actions = useActions()

  const openedFiltersDialog = useSelector(state => state.schedule.page.openedFiltersDialog)

  const close = useCallback(
    () => {
      actions.schedule.page.cancelFiltersUpdate()
    }, [actions]
  )

  return (
    <Dialog open={openedFiltersDialog} onClose={close} maxWidth='xs' fullWidth={true}>
      <Form />
    </Dialog>
  )
}

export default SchedulePage
