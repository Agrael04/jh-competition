import React from 'react'
import { IStoreState, useSelector, useActions } from 'store'

import Dialog from '@material-ui/core/Dialog'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import IconButton from '@material-ui/core/IconButton'
import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid'
import Box from '@material-ui/core/Box'
import Divider from '@material-ui/core/Divider'
import MenuItem from '@material-ui/core/MenuItem'

import CloseIcon from '@material-ui/icons/Close'

import DatePicker from 'containers/date-picker'

import useStyles from './styles'

// import TextField from 'containers/text-field'
// import DatePicker from 'containers/date-picker'
import Select from 'containers/select'

// import EndTimeSelect from './fields/end-time-select'
// import StartTimeSelect from './fields/start-time-select'
import TimeframesBlock from './timeframes-block'
import SubmitButton from './submit-button'

import { trainerSchedule, trainers } from '../data'

type FieldName = keyof IStoreState['schedule']['addTrainerDialog']['form']

const fieldSelector = (name: FieldName) => (state: IStoreState) => state.schedule.addTrainerDialog.form[name]

export default function TrainingDialog() {
  const classes = useStyles()
  const opened = useSelector(state => state.schedule.addTrainerDialog.opened)
  const actions = useActions()

  const filteredTrainers = React.useMemo(
    () => trainers.filter(trainer => !trainerSchedule.find(ts => ts.id === trainer.id)),
    []
  )

  const close = React.useCallback(
    () => actions.schedule.addTrainerDialog.close(),
    [actions]
  )

  const handleChange = (name: string, value: any) => {
    actions.schedule.addTrainerDialog.updateField(name, value)
  }

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
      <Box padding={3}>
        <Grid container={true} direction='column' justify='space-around'>
          <Grid item={true} container={true} spacing={3} justify='space-around'>
            <Grid item={true} lg={6}>
              <DatePicker
                name='date'
                fieldSelector={fieldSelector}
                label={'Дата'}
                fullWidth={true}
                inputVariant='outlined'
                disableToolbar={true}
                variant='inline'
                disabled={true}
              />
            </Grid>
            <Grid item={true} lg={6} container={true}>
              <Box marginY='auto' width='100%'>
                <Select
                  name='trainer'
                  onChange={handleChange}
                  fieldSelector={fieldSelector}
                  label={'Тренер'}
                  fullWidth={true}
                  variant='outlined'
                >
                  {
                    filteredTrainers.map(trainer => (
                      <MenuItem value={trainer.id} key={trainer.id}>
                        {trainer.firstName} {trainer.lastName}
                      </MenuItem>
                    ))
                  }
                </Select>
              </Box>
            </Grid>
            <Grid item={true} lg={12}>
              <Divider className={classes.divider} />
            </Grid>
            <TimeframesBlock />
          </Grid>
          <Box marginTop={2}>
            <Grid item={true} container={true} justify='flex-end'>
              <SubmitButton />
            </Grid>
          </Box>
        </Grid>
      </Box>
    </Dialog>
  )
}
