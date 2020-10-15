import React from 'react'
import { useSelector } from 'store'
import { useForm, FormProvider } from 'react-hook-form'

import Grid from '@material-ui/core/Grid'
import Box from '@material-ui/core/Box'
import Divider from '@material-ui/core/Divider'
import MenuItem from '@material-ui/core/MenuItem'

import useStyles from './styles'

import FormController from 'containers/fields/form-controller'
import DatePicker from 'containers/fields/date-picker'
import Select from 'containers/fields/select'

import TimeframesBlock from './timeframes-block'
import SubmitButton from './submit-button'

import useGetSchedulesQuery from '../../queries/get-schedules'
import useGetTrainersQuery from '../../queries/get-trainers'

import { requiredValidation } from 'utils/validations'

export interface IScheduleForm {
  trainer?: string
  date?: Date
  timeFrames?: Array<{
    from?: number
    to?: number
    gym?: string
  }>
}

export default function TrainingDialog() {
  const classes = useStyles()
  const opened = useSelector(state => state.schedule.addTrainerDialog.opened)
  const date = useSelector(state => state.schedule.page.activeDate)
  const gym = useSelector(state => state.schedule.page.activeGym)
  const schedulesQuery = useGetSchedulesQuery()
  const trainersQuery = useGetTrainersQuery(!opened)

  const methods = useForm<IScheduleForm>({
    defaultValues: {
      date,
      timeFrames: [
        {
          gym,
        },
      ],
    },
  })

  const filteredTrainers = React.useMemo(
    () => trainersQuery?.data?.trainers?.filter(trainer => !schedulesQuery.data?.trainerSchedules.find(s => s.trainer._id === trainer._id)) || [],
    [trainersQuery, schedulesQuery]
  )

  return (
    <FormProvider {...methods}>
      <Box padding={3}>
        <Grid container={true} direction='column' justify='space-around'>
          <Grid item={true} container={true} spacing={3} justify='space-around'>
            <Grid item={true} lg={6}>
              <FormController name='date'>
                <DatePicker
                  label={'Дата'}
                  fullWidth={true}
                  inputVariant='outlined'
                  disableToolbar={true}
                  variant='inline'
                  disabled={true}
                />
              </FormController>
            </Grid>
            <Grid item={true} lg={6} container={true}>
              <Box marginY='auto' width='100%'>
                <FormController name='trainer' rules={requiredValidation}>
                  <Select
                    label={'Тренер'}
                    fullWidth={true}
                    variant='outlined'
                  >
                    {
                      filteredTrainers.map(trainer => (
                        <MenuItem value={trainer._id} key={trainer._id}>
                          {trainer.firstName} {trainer.lastName}
                        </MenuItem>
                      ))
                    }
                  </Select>
                </FormController>
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
    </FormProvider>
  )
}
