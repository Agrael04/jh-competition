import Dialog from '@material-ui/core/Dialog'

import { cancelFiltersUpdate } from 'store/ui/pages/schedule/page/actions'

import Form from './form'

import { useSelector, useDispatch } from 'store'


const SchedulePage = () => {
  const dispatch = useDispatch()

  const openedFiltersDialog = useSelector(state => state.ui.pages.schedule.page.openedFiltersDialog)

  const close = () => {
    dispatch(cancelFiltersUpdate())
  }

  return (
    <Dialog open={openedFiltersDialog} onClose={close} maxWidth='xs' fullWidth={true}>
      <Form />
    </Dialog>
  )
}

export default SchedulePage
