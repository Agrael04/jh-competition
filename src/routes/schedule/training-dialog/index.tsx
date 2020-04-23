import React from 'react'
import { IStoreState, useSelector, useActions } from 'store'

import Dialog from '@material-ui/core/Dialog'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import IconButton from '@material-ui/core/IconButton'
import Typography from '@material-ui/core/Typography'
import CloseIcon from '@material-ui/icons/Close'

import Grid from '@material-ui/core/Grid'
import Box from '@material-ui/core/Box'
import MenuItem from '@material-ui/core/MenuItem'

import TextField from 'containers/text-field'
import DatePicker from 'containers/date-picker'
import Select from 'containers/select'

import GymSelect from './fields/gym-select'

import ResourcesBlock from './resources-block'
import RecordsBlock from './records-block'

import SubmitButton from './submit-button'
import SubmitUpdateButton from './submit-update-button'
import DeleteButton from './delete-button'

import useGetTrainingQuery, { convertTrainingToInput } from '../queries/get-training'

const translations = {
  'date': 'Дата',
  'startTime': 'Час початку',
  'trainer': 'Тренер',
  'gym': 'Зал',
  'notes': 'Комментарi',
  'trampolines': 'Батуты',
  'trainingType': 'Тип треннування',
  'trainingName': 'Назва',
  'moneyPrice': 'Разова цiна',
  'markPrice': 'Кiлькiсть вiдмiток',

  'types.GROUP': 'Групове треннування',
  'types.RENT': 'Оренда батуту',
  'types.RENT_WITH_TRAINER': 'Оренда батута с тренером',
  'types.EVENT': 'Подiя',
} as any

const trainingTypes = [
  'GROUP',
  'RENT',
  'RENT_WITH_TRAINER',
  'EVENT',
]

type FieldName = keyof IStoreState['schedule']['trainingDialog']['trainingForm']

const fieldSelector = (name: FieldName) => (state: IStoreState) => state.schedule.trainingDialog.trainingForm[name]

export default function TrainingDialog() {
  const { opened, mode, _id } = useSelector(state => ({
    opened: state.schedule.trainingDialog.opened,
    mode: state.schedule.trainingDialog.mode,
    _id: state.schedule.trainingDialog._id,
  }))

  const trainingQuery = useGetTrainingQuery(_id!, mode === 'create')

  const actions = useActions()

  const close = React.useCallback(
    () => actions.schedule.trainingDialog.close(),
    [actions]
  )

  const handleChange = React.useCallback(
    (name: string, value: any) => {
      let v = value
      if (name === 'markPrice' || name === 'moneyPrice') {
        v = Number(value)
      }

      if (typeof v === 'object') {
        v = v.toDate()
      }

      actions.schedule.trainingDialog.updateField(name, v)
    },
    [actions]
  )

  React.useEffect(
    () => {
      if (trainingQuery.data?.training) {
        const training = convertTrainingToInput(trainingQuery.data.training)

        actions.schedule.trainingDialog.initialize(training, training.records, training.resources)
      }
    }, [actions, trainingQuery, _id]
  )

  return (
    <Dialog open={opened} onClose={close} maxWidth='lg' fullWidth={true}>
      <AppBar position='relative'>
        <Toolbar>
          <IconButton edge='start' color='inherit' onClick={close} aria-label='close'>
            <CloseIcon />
          </IconButton>
          <Typography variant='h6'>
            Тренировка
          </Typography>
        </Toolbar>
      </AppBar>
      <Box padding={3}>
        <Grid container={true} direction='column' justify='space-around'>
          <Grid item={true} container={true} spacing={3} justify='space-around'>
            <Grid item={true} container={true} lg={4} spacing={2}>
              <Grid item={true} lg={12}>
                <GymSelect
                  name='gym'
                  label={translations.gym}
                />
              </Grid>
              <Grid item={true} lg={12}>
                <DatePicker
                  name='date'
                  onChange={handleChange}
                  fieldSelector={fieldSelector}
                  label={translations.date}
                  fullWidth={true}
                  inputVariant='outlined'
                  disableToolbar={true}
                  variant='inline'
                />
              </Grid>
            </Grid>
            <Grid item={true} container={true} lg={4} spacing={2}>
              <Grid item={true} lg={12}>
                <TextField
                  name='name'
                  onChange={handleChange}
                  fieldSelector={fieldSelector}
                  label={translations.trainingName}
                  fullWidth={true}
                  variant='outlined'
                />
                <Box marginBottom={3} />
              </Grid>
              <Grid item={true} lg={8}>
                <Select
                  name='type'
                  onChange={handleChange}
                  fieldSelector={fieldSelector}
                  label={translations.trainingType}
                  fullWidth={true}
                  variant='outlined'
                >
                  {
                    trainingTypes.map(type => (
                      <MenuItem value={type} key={type}>
                        {translations[`types.${type}`]}
                      </MenuItem>
                    ))
                  }
                </Select>
              </Grid>
              <Grid item={true} lg={4}>
                <Select
                  name='type'
                  onChange={handleChange}
                  fieldSelector={fieldSelector}
                  label={'Кол-во'}
                  fullWidth={true}
                  variant='outlined'
                >
                  {
                    trainingTypes.map(type => (
                      <MenuItem value={type} key={type}>
                        {translations[`types.${type}`]}
                      </MenuItem>
                    ))
                  }
                </Select>
              </Grid>
            </Grid>
            <Grid item={true} container={true} lg={4} spacing={2}>
              <Grid item={true} lg={12}>
                <TextField
                  name='note'
                  onChange={handleChange}
                  fieldSelector={fieldSelector}
                  label={translations.notes}
                  rows={6}
                  fullWidth={true}
                  variant='outlined'
                  multiline={true}
                />
              </Grid>
            </Grid>
            {
              mode === 'update' && (
                <Grid item={true} lg={12} container={true} justify='space-between'>
                  <DeleteButton />
                  <SubmitUpdateButton />
                </Grid>
              )
            }
            <ResourcesBlock />
            <RecordsBlock />
            {
              mode === 'create' && (
                <>
                  <Grid item={true} lg={12}>
                    <Box color='primary.main' borderBottom={2} />
                  </Grid>
                  <Grid item={true} container={true} justify='flex-end'>
                    <SubmitButton />
                  </Grid>
                </>
              )
            }
          </Grid>
        </Grid>
      </Box>
    </Dialog>
  )
}
