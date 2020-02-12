import React from 'react'

import Grid from '@material-ui/core/Grid'
import Box from '@material-ui/core/Box'
import Paper from '@material-ui/core/Paper'
import TextField from '@material-ui/core/TextField'
import MenuItem from '@material-ui/core/MenuItem'
import Container from '@material-ui/core/Container'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction'
import IconButton from '@material-ui/core/IconButton'
import Button from '@material-ui/core/Button'

import MoreVertIcon from '@material-ui/icons/MoreVert'

import { DatePicker, TimePicker } from '@material-ui/pickers'

import Select from '../../components/select'

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

const durations = [
  '1h',
  '2h',
  '1.5h',
  'flexible',
]

const gyms = [
  { id: 1, text: 'Берестейська' },
  { id: 2, text: 'Харькiвське шосе' },
  { id: 3, text: 'Почайна' },
  { id: 4, text: 'Парк дружбы народов' },
]

const trainers = [
  'Ковальва Катерина',
  'Хоботов Сергiй',
  'Наталья Вiкторовна',
  'Берзiн Валерiй',
  'Биков Егор',
  'Соколовський Сергiй',
]

const trainees = [
  { name: 'Куроко Тетсуя', seasonPass: 'Абонимент 123', status: 'RESERVED', paymentMethod: 'SINGLE_PAYMENT', paid: true },
  { name: 'Кисе Риота', seasonPass: 'Абонимент 123', status: 'RESERVED', paymentMethod: 'DEBT', paid: false },
  { name: 'Кагами Таига', seasonPass: 'Абонимент 123', status: 'PENDING', paymentMethod: 'SEASON_PASS', paid: true },
  { name: 'Мидорима Шинтаро', seasonPass: 'Абонимент 123', status: 'CONFIRMED', paymentMethod: 'SEASON_PASS', paid: true },
  { name: 'Кийоши Тепей', seasonPass: 'Абонимент 123', status: 'CANCELED', paymentMethod: 'SINGLE_PAYMENT', paid: false },
]

const CreateTrainingPage = ({}) => {
  const [date, setDate] = React.useState(null)
  const [startTime, setStartTime] = React.useState(null)

  const handleDateChange = React.useCallback(e => {
    setDate(e)
  }, [setDate])

  const handleStartTimeChange = React.useCallback(e => {
    setStartTime(e)
  }, [setStartTime])

  return (
    <Box paddingY={3}>
      <Container>
        <Paper>
          <Box padding={3}>
            <Grid container={true} spacing={3} justify='space-around'>
              <Grid item={true} container={true} lg={4} spacing={2}>
                <Grid item={true} lg={12}>
                  <TextField
                    label={translations.trainingName}
                    fullWidth={true}
                    variant='outlined'
                  />
                </Grid>
                <Grid item={true} lg={12}>
                  <Select
                    value={null}
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
                <Grid item={true} lg={6}>
                  <TextField
                    label={translations.moneyPrice}
                    fullWidth={true}
                    variant='outlined'
                  />
                </Grid>
                <Grid item={true} lg={6}>
                  <TextField
                    label={translations.markPrice}
                    fullWidth={true}
                    variant='outlined'
                  />
                </Grid>
              </Grid>
              <Grid item={true} container={true} lg={4} spacing={2}>
                <Grid item={true} lg={12}>
                  <Select
                    value={null}
                    label={translations.trainer}
                    fullWidth={true}
                    variant='outlined'
                  >
                    {
                      trainers.map(trainer => (
                        <MenuItem value={trainer} key={trainer}>
                          {trainer}
                        </MenuItem>
                      ))
                    }
                  </Select>
                </Grid>
                <Grid item={true} lg={12}>
                  <Select
                    value={null}
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
                <Grid item={true} lg={12}>
                  <Select
                    value={[1, 2, 3, 4, 5, 6, 7]}
                    label={translations.trampolines}
                    fullWidth={true}
                    variant='outlined'
                    multiple={true}
                  >
                    <MenuItem value={1}>
                      Батут 1
                    </MenuItem>
                    <MenuItem value={2}>
                      Батут 2
                    </MenuItem>
                    <MenuItem value={3}>
                      Батут 3
                    </MenuItem>
                    <MenuItem value={4}>
                      Батут 4
                    </MenuItem>
                    <MenuItem value={5}>
                      Батут 5
                    </MenuItem>
                    <MenuItem value={6}>
                      Батут 6
                    </MenuItem>
                    <MenuItem value={7}>
                      Батут 7
                    </MenuItem>
                  </Select>
                </Grid>
              </Grid>
              <Grid item={true} container={true} lg={4} spacing={2}>
                <Grid item={true} lg={12}>
                  <DatePicker
                    value={date}
                    onChange={handleDateChange}
                    disablePast={true}
                    label={translations.date}
                    cancelLabel={translations.cancelLabel}
                    okLabel={translations.okLabel}
                    fullWidth={true}
                    inputVariant='outlined'
                  />
                </Grid>
                <Grid item={true} lg={6}>
                  <TimePicker
                    value={startTime}
                    onChange={handleStartTimeChange}
                    label={translations.startTime}
                    cancelLabel={translations.cancelLabel}
                    okLabel={translations.okLabel}
                    fullWidth={true}
                    ampm={false}
                    inputVariant='outlined'
                  />
                </Grid>
                <Grid item={true} lg={6}>
                  <TimePicker
                    value={startTime}
                    onChange={handleStartTimeChange}
                    label={translations.startTime}
                    cancelLabel={translations.cancelLabel}
                    okLabel={translations.okLabel}
                    fullWidth={true}
                    ampm={false}
                    inputVariant='outlined'
                  />
                </Grid>
                <Grid item={true} lg={12}>
                  <Select
                    value={null}
                    label={translations.duration}
                    fullWidth={true}
                    variant='outlined'
                  >
                    {
                      durations.map(dur => (
                        <MenuItem value={dur} key={dur}>
                          {translations[`durations.${dur}`]}
                        </MenuItem>
                      ))
                    }
                  </Select>
                </Grid>
              </Grid>
              <Grid item={true} container={true} lg={12} spacing={2}>
                <Grid item={true} lg={12}>
                  <List>
                    {
                      trainees.map(trainee => (
                        <ListItem key={trainee.name}>
                          <ListItemText
                            primary={
                              `${trainee.name} ${trainee.seasonPass ? ` / ${trainee.seasonPass}` : ''}`
                            }
                            secondary={
                              `${translations[`status.${trainee.status}`]} ${trainee.paid ? ` / ${translations.paid}` : ''}`
                            }
                          />
                          <ListItemSecondaryAction>
                            <IconButton edge='end' aria-label='delete'>
                              <MoreVertIcon />
                            </IconButton>
                          </ListItemSecondaryAction>
                        </ListItem>
                      ))
                    }
                  </List>
                </Grid>
              </Grid>
              <Grid item={true} container={true} lg={12} spacing={2}>
                <Grid item={true} lg={12}>
                  <TextField
                    label={translations.notes}
                    rows={8}
                    fullWidth={true}
                    variant='outlined'
                    multiline={true}
                  />
                </Grid>
              </Grid>
              <Grid item={true} container={true} lg={12} spacing={2} justify='flex-end'>
                <Button variant='outlined'> Cancel </Button>
                <Button variant='contained' color='secondary'> Save </Button>
              </Grid>
            </Grid>
          </Box>
        </Paper>
      </Container>
    </Box>
  )
}

export default CreateTrainingPage
