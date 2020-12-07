import { useCallback } from 'react'
import { Moment } from 'moment'
import { useSelector, useActions } from 'store'

import Dialog from '@material-ui/core/Dialog'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import IconButton from '@material-ui/core/IconButton'
import Typography from '@material-ui/core/Typography'

import CloseIcon from '@material-ui/icons/Close'

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
  const opened = useSelector(state => state.schedule.addTrainerDialog.opened)
  const actions = useActions()

  const close = useCallback(
    () => actions.schedule.addTrainerDialog.close(),
    [actions]
  )

  return (
    <Dialog open={opened} onClose={close} maxWidth='sm' fullWidth={true}>
      <AppBar position='relative'>
        <Toolbar>
          <IconButton edge='start' color='inherit' onClick={close} aria-label='close'>
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
