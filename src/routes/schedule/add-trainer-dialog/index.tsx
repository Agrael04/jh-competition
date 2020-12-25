import { Moment } from 'moment'
import { useSelector, useDispatch } from 'store'

import Dialog from '@material-ui/core/Dialog'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import IconButton from '@material-ui/core/IconButton'
import Typography from '@material-ui/core/Typography'

import CloseIcon from '@material-ui/icons/Close'

import { close } from 'store/ui/pages/schedule/add-trainer-dialog/actions'

import Form from './form'

export interface IScheduleForm {
  trainer?: string
  date?: Moment
  timeFrames?: Array<{
    from?: number
    to?: number
    gym?: string
  }>
}

export default function TrainingDialog() {
  const opened = useSelector(state => state.ui.pages.schedule.addTrainerDialog.opened)
  const dispatch = useDispatch()

  const handleClose = () => dispatch(close())

  return (
    <Dialog open={opened} onClose={handleClose} maxWidth='sm' fullWidth={true}>
      <AppBar position='relative'>
        <Toolbar>
          <IconButton edge='start' color='inherit' onClick={handleClose} aria-label='close'>
            <CloseIcon />
          </IconButton>
          <Typography variant='h6'>
            Расписание тренера
          </Typography>
        </Toolbar>
      </AppBar>
      {
        opened && <Form />
      }
    </Dialog>
  )
}
