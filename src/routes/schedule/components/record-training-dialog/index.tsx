import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { IStoreState } from '../../../../store'

import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import ListItemText from '@material-ui/core/ListItemText'
import ListItem from '@material-ui/core/ListItem'
import List from '@material-ui/core/List'
import Divider from '@material-ui/core/Divider'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import IconButton from '@material-ui/core/IconButton'
import Typography from '@material-ui/core/Typography'
import CloseIcon from '@material-ui/icons/Close'
import Slide from '@material-ui/core/Slide'
import { TransitionProps } from '@material-ui/core/transitions'

import Grid from '@material-ui/core/Grid'
import Box from '@material-ui/core/Box'
import TextField from '@material-ui/core/TextField'
import MenuItem from '@material-ui/core/MenuItem'
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction'

import MoreVertIcon from '@material-ui/icons/MoreVert'

import { DatePicker } from '@material-ui/pickers'

import Select from '../../../../components/select'

import useStyles from './styles'

import { times, resources, trainers } from '../../data'

import actions from '../../../../store/actions'

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

const trainees = [
  { name: 'Куроко Тетсуя', seasonPass: 'Абонимент 123', status: 'RESERVED', paymentMethod: 'SINGLE_PAYMENT', paid: true },
  { name: 'Кисе Риота', seasonPass: 'Абонимент 123', status: 'RESERVED', paymentMethod: 'DEBT', paid: false },
  { name: 'Кагами Таига', seasonPass: 'Абонимент 123', status: 'PENDING', paymentMethod: 'SEASON_PASS', paid: true },
  // { name: 'Мидорима Шинтаро', seasonPass: 'Абонимент 123', status: 'CONFIRMED', paymentMethod: 'SEASON_PASS', paid: true },
  // { name: 'Кийоши Тепей', seasonPass: 'Абонимент 123', status: 'CANCELED', paymentMethod: 'SINGLE_PAYMENT', paid: false },
]

const Transition = React.forwardRef<unknown, TransitionProps>(function Transition(props, ref) {
  return <Slide direction='up' ref={ref} {...props} />
})

export default function AddTrainingDialog() {
  const state = useSelector((state: IStoreState) => state.schedule)
  const dispatch = useDispatch()
  const classes = useStyles()
  const [date, setDate] = React.useState(null)

  const { openedRecordDialog, recordDialogPayload } = state

  const close = () => dispatch(actions.schedule.closeRecordDialog())
  const save = () => recordDialogPayload && dispatch(actions.schedule.createRecord(recordDialogPayload))

  const handleDateChange = React.useCallback(e => {
    setDate(e)
  }, [setDate])

  if (!recordDialogPayload) {
    return null
  }

  return (
    <Dialog open={openedRecordDialog} onClose={close} TransitionComponent={Transition} maxWidth='lg' fullWidth={true}>
      <AppBar className={classes.appBar}>
        <Toolbar>
          <IconButton edge='start' color='inherit' onClick={close} aria-label='close'>
            <CloseIcon />
          </IconButton>
          <Typography variant='h6' className={classes.title}>
            Add training
          </Typography>
        </Toolbar>
      </AppBar>
      <Box padding={3} className={classes.box}>
        <Grid container={true} direction='column' justify='space-around' className={classes.dialogBody}>
          <Grid item={true} container={true} spacing={3} justify='space-around'>
            <Grid item={true} container={true} lg={4} spacing={2}>
              <Grid item={true} lg={6}>
                <Select
                  value={recordDialogPayload.gym}
                  label={translations.gym}
                  fullWidth={true}
                  variant='outlined'
                  disabled={true}
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
                  value={recordDialogPayload.date}
                  onChange={handleDateChange}
                  disablePast={true}
                  label={translations.date}
                  cancelLabel={translations.cancelLabel}
                  okLabel={translations.okLabel}
                  fullWidth={true}
                  inputVariant='outlined'
                  disabled={true}
                />
              </Grid>
              <Grid item={true} lg={12}>
                <Select
                  value={recordDialogPayload.trainer}
                  label={translations.trainer}
                  fullWidth={true}
                  variant='outlined'
                  disabled={true}
                >
                  {
                    trainers.map(trainer => (
                      <MenuItem value={trainer.id} key={trainer.id}>
                        {trainer.name}
                      </MenuItem>
                    ))
                  }
                </Select>
              </Grid>
              <Grid item={true} lg={6}>
                <Select
                  value={recordDialogPayload.time}
                  label={translations.startTime}
                  fullWidth={true}
                  variant='outlined'
                  disabled={true}
                >
                  {
                    times.map(time => (
                      <MenuItem value={time} key={time}>
                        {time}
                      </MenuItem>
                    ))
                  }
                </Select>
              </Grid>
              <Grid item={true} lg={6}>
                <Select
                  value={recordDialogPayload.resource}
                  label={translations.trampolines}
                  fullWidth={true}
                  variant='outlined'
                  disabled={true}
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
            </Grid>
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
                <TextField
                  label={translations.notes}
                  rows={9}
                  fullWidth={true}
                  variant='outlined'
                  multiline={true}
                />
              </Grid>
            </Grid>
            {
              trainees.map(trainee => (
                <Grid item={true} lg={12} key={trainee.name}>
                  <Box m={1}>
                    <Grid container={true} spacing={2}>
                      <Grid item={true} lg={6} container={true} spacing={2}>
                        <Grid item={true} lg={12}>
                          <TextField
                            label={'Name'}
                            fullWidth={true}
                            variant='outlined'
                            defaultValue={trainee.name}
                          />
                        </Grid>
                        <Grid item={true} lg={4}>
                          <TextField
                            label={'Abonement'}
                            fullWidth={true}
                            variant='outlined'
                            defaultValue={trainee.seasonPass}
                          />
                        </Grid>
                        <Grid item={true} lg={4}>
                          <Select
                            label={'Status'}
                            fullWidth={true}
                            variant='outlined'
                            value={trainee.status}
                          >
                            {
                              ['RESERVED', 'PENDING', 'CONFIRMED'].map(type => (
                                <MenuItem value={type} key={type}>
                                  {type}
                                </MenuItem>
                              ))
                            }
                          </Select>
                        </Grid>
                      </Grid>
                      <Grid item={true} lg={5}>
                        <TextField
                          label={translations.notes}
                          rows={5}
                          fullWidth={true}
                          variant='outlined'
                          multiline={true}
                          defaultValue='Sugester for name/season pass, add more/remove buttons implementation. Mb another field paid? hmm'
                        />
                      </Grid>
                      <Grid container={true} justify='center' direction='column' item={true} lg={1}>
                        <Button color='primary'>
                          Remove
                        </Button>
                      </Grid>
                    </Grid>
                  </Box>
                </Grid>
              ))
            }
          </Grid>

          <Grid item={true} container={true} justify='flex-end'>
            <Button variant='contained' color='primary' onClick={save}> Save </Button>
          </Grid>
        </Grid>
      </Box>
    </Dialog>
  )
}
