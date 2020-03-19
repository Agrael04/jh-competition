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

import TraineesBlock from './trainees-block'
import TrainerSelect from './trainer-select'
import SubmitButton from './submit-button'
import DeleteButton from './delete-button'

import { times, resources } from '../data'

const translations = {
  'okLabel': 'Oк',
  'cancelLabel': 'Отмена',
  'date': 'Дата',
  'startTime': 'Час початку',
  'duration': 'Тривалiсть',
  'trainer': 'Тренер',
  'gym': 'Зал',
  'notes': 'Комментарi',
  'trampolines': 'Батуты',
  'trainingType': 'Тип треннування',
  'trainingName': 'Назва',
  'moneyPrice': 'Разова цiна',
  'markPrice': 'Кiлькiсть вiдмiток',
  'paid': 'Оплачен',

  'status.RESERVED': 'Зарезервовано',
  'status.PENDING': 'Пiдтвердження надiслано',
  'status.CANCELED': 'Скасовано',
  'status.CONFIRMED': 'Пiдтведжено',

  'types.GROUP': 'Групове треннування',
  'types.RENT': 'Оренда батуту',
  'types.RENT_WITH_TRAINER': 'Оренда батута с тренером',
  'types.EVENT': 'Подiя',

  'durations.1h': '1 година',
  'durations.1.5h': '1.5 години',
  'durations.2h': '2 години',
  'durations.flexible': 'Гнучка',
} as any

const trainingTypes = [
  'GROUP',
  'RENT',
  'RENT_WITH_TRAINER',
  'EVENT',
]

const gyms = [
  { id: 1, text: 'Берестейська' },
  { id: 2, text: 'Харькiвське шосе' },
  { id: 3, text: 'Почайна' },
  { id: 4, text: 'Парк дружбы народов' },
]

type FieldName = keyof IStoreState['schedule']['trainingForm']

const fieldSelector = (name: FieldName) => (state: IStoreState) => state.schedule.trainingForm[name]

export default function TrainingDialog() {
  const openedRecordDialog = useSelector(state => state.schedule.openedRecordDialog)
  const actions = useActions()

  const close = React.useCallback(
    () => actions.schedule.closeRecordDialog(),
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

      actions.schedule.updateFormField(name, v)
    },
    [actions]
  )

  return (
    <Dialog open={openedRecordDialog} onClose={close} maxWidth='lg' fullWidth={true}>
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
              <Grid item={true} lg={6}>
                <Select
                  name='gym'
                  onChange={handleChange}
                  fieldSelector={fieldSelector}
                  label={translations.gym}
                  fullWidth={true}
                  variant='outlined'
                >
                  {
                    gyms.map(gym => (
                      <MenuItem value={gym.id} key={gym.id}>
                        {gym.text}
                      </MenuItem>
                    ))
                  }
                </Select>
              </Grid>
              <Grid item={true} lg={6}>
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
              <Grid item={true} lg={12}>
                <Select
                  name='resource'
                  onChange={handleChange}
                  fieldSelector={fieldSelector}
                  label={translations.trampolines}
                  fullWidth={true}
                  variant='outlined'
                >
                  {
                    resources.map(r => (
                      <MenuItem value={r.id} key={r.id}>
                        {r.name}
                      </MenuItem>
                    ))
                  }
                </Select>
              </Grid>
              <Grid item={true} lg={6}>
                <Select
                  name='startTime'
                  onChange={handleChange}
                  fieldSelector={fieldSelector}
                  label={translations.startTime}
                  fullWidth={true}
                  variant='outlined'
                >
                  {
                    times.map(time => (
                      <MenuItem value={time.id} key={time.id}>
                        {time.label}
                      </MenuItem>
                    ))
                  }
                </Select>
              </Grid>
              <Grid item={true} lg={6}>
                <Select
                  name='endTime'
                  onChange={handleChange}
                  fieldSelector={fieldSelector}
                  label={translations.startTime}
                  fullWidth={true}
                  variant='outlined'
                >
                  {
                    times.map(time => (
                      <MenuItem value={time.id} key={time.id}>
                        {time.label}
                      </MenuItem>
                    ))
                  }
                </Select>
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
              </Grid>
              <Grid item={true} lg={12}>
                <TrainerSelect
                  name='trainer'
                  label='Тренер'
                  onChange={handleChange}
                  fieldSelector={fieldSelector}
                />
              </Grid>
              <Grid item={true} lg={12}>
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
            </Grid>
            <Grid item={true} container={true} lg={4} spacing={2}>
              <Grid item={true} lg={12}>
                <TextField
                  name='note'
                  onChange={handleChange}
                  fieldSelector={fieldSelector}
                  label={translations.notes}
                  rows={9}
                  fullWidth={true}
                  variant='outlined'
                  multiline={true}
                />
              </Grid>
            </Grid>
            <TraineesBlock />
          </Grid>
          <Box marginTop={1}>
            <Grid item={true} container={true} justify='space-between'>
              <DeleteButton />
              <SubmitButton />
            </Grid>
          </Box>
        </Grid>
      </Box>
    </Dialog>
  )
}
