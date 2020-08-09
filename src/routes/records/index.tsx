import React from 'react'
import moment from 'moment'
import { uniq } from 'lodash'
import { useSelector, useActions } from 'store'

import Paper from '@material-ui/core/Paper'

import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'

import Toolbar from '@material-ui/core/Toolbar'
import Grid from '@material-ui/core/Grid'
import CircularProgress from '@material-ui/core/CircularProgress'
import Box from '@material-ui/core/Box'
import IconButton from '@material-ui/core/IconButton'
import Dialog from '@material-ui/core/Dialog'
import Typography from '@material-ui/core/Typography'

import ReceiptIcon from '@material-ui/icons/Receipt'

import FiltersDialog from './filters-dialog'

import useGetRecords, { IRecord } from './graphql/get-records'
import useGetGymsQuery from './graphql/get-gyms'
import useGetTrainersQuery from './graphql/get-trainers'

import { getTimeLabel } from 'data/times'
import { trainingTypes, GROUP_TRAININGS } from 'data/training-types'

import useStyles from './styles'

import XLSX from 'xlsx'

const generateXLSX = (data: any[][]) => {
  const wb = XLSX.utils.book_new()
  const ws = XLSX.utils.aoa_to_sheet(data)

  XLSX.utils.book_append_sheet(wb, ws, 'Записи')
  XLSX.writeFile(wb, `Записи.xlsx`)
}

const PEOPLE_TYPE = 'PEOPLE'
const HOURS_TYPE = 'HOURS'

interface ITraining {
  _id: IRecord['training']['_id']
  trainer: IRecord['resource']['trainer']
  startTime: IRecord['resource']['startTime']
  endTime: IRecord['resource']['endTime']
  gym: IRecord['training']['gym'],
  date: IRecord['training']['date'],
  type: IRecord['training']['type']
  hours: number
  people: number
  valueType: typeof PEOPLE_TYPE | typeof HOURS_TYPE
  contacts: Array<IRecord['contact']>
}

const RecordsPage = () => {
  const actions = useActions()
  const { filters, openedFiltersDialog } = useSelector(state => state.records.page)
  const classes = useStyles()

  const { data, loading } = useGetRecords()
  const gyms = useGetGymsQuery()
  const trainers = useGetTrainersQuery()

  const trainings = React.useMemo(
    () => {
      const trainings: ITraining[] = []

      data?.trainingRecords.forEach(tr => {
        const isMulti = (
          tr.training.type === GROUP_TRAININGS.GROUP ||
          tr.training.type === GROUP_TRAININGS.EVENT ||
          tr.training.type === GROUP_TRAININGS.SECTION
        )

        const index = trainings.findIndex(t => t._id === tr.training._id)

        if (index === -1) {
          const records = data?.trainingRecords.filter(t => t.training._id === tr.training._id)
          const duration = tr.resource.endTime - tr.resource.startTime

          const hours = !isMulti ? duration / 2 : tr.training.type === GROUP_TRAININGS.GROUP ? records.length / 2 : 0
          const people = !isMulti ? 0 : tr.training.type === GROUP_TRAININGS.GROUP ? 0 : records.length

          const valueType = !isMulti ? HOURS_TYPE : tr.training.type === GROUP_TRAININGS.GROUP ? HOURS_TYPE : PEOPLE_TYPE

          trainings.push({
            _id: tr.training._id,
            trainer: tr.resource.trainer,
            startTime: Math.min(...records.map(r => r.resource.startTime)),
            endTime: Math.max(...records.map(r => r.resource.endTime)),
            gym: tr.training.gym,
            date: tr.training.date,
            type: tr.training.type,
            contacts: records.map(t => ({
              _id: t.contact._id,
              name: t.contact.name,
              surname: t.contact.surname,
            })),
            hours,
            people,
            valueType,
          })
        }
      })

      return trainings
    }, [data]
  )

  const handleXLSXClick = React.useCallback(
    () => {
      const ws_data = trainings.map(tr => ([
        moment(tr.date).format('DD.MM'),
        tr.gym.shortName,
        trainingTypes.find(t => t.id === tr.type)?.text,
        getTimeLabel(tr.startTime),
        getTimeLabel(tr.endTime),
        `${tr.trainer?.lastName} ${tr.trainer?.firstName}`,
        tr.valueType === HOURS_TYPE ? tr.hours : '',
        tr.valueType === PEOPLE_TYPE ? tr.people : '',
        tr.contacts.map(contact => `${contact.surname} ${contact.name}`).join(', '),
      ]))
      generateXLSX([
        ['Дата', 'Зал', 'Тип тренировки', 'Время начало', 'Время конца', 'Тренер', 'Батуто-часы', 'Люди', 'Контакты'],
        ...ws_data,
      ])
    }, [trainings]
  )

  const startFilterEditing = React.useCallback(
    () => {
      actions.records.page.startFilterUpdate()
    }, [actions]
  )

  const close = React.useCallback(
    () => {
      actions.records.page.cancelFilterUpdate()
    }, [actions]
  )

  const currentGym = React.useMemo(
    () => {
      return gyms?.data?.gyms.find(gym => gym._id === filters.gym)
    }, [gyms, filters.gym]
  )

  const currentTrainer = React.useMemo(
    () => {
      return trainers?.data?.trainers.find(trainer => trainer._id === filters.trainer)
    }, [trainers, filters.trainer]
  )

  // console.log(filters.date.format())

  return (
    <Paper className={classes.rootPaper}>
      <Toolbar>
        <Grid container={true} justify='flex-end'>
          <IconButton color='primary' onClick={handleXLSXClick}>
            <ReceiptIcon />
          </IconButton>
        </Grid>
      </Toolbar>
      <Table stickyHeader={true}>
        <TableHead>
          <TableRow>
            <TableCell onClick={startFilterEditing} className={classes.clickable}>
              Дата
              <Typography variant='caption' color='primary' component='div'>
                {filters.date.format('MMMM YYYY')}
              </Typography>
              {
                !loading && (
                  <Typography variant='caption' color='secondary'>
                    {uniq(trainings.map(t => t.date)).length} дней
                  </Typography>
                )
              }
            </TableCell>
            <TableCell onClick={startFilterEditing} className={classes.clickable}>
              Зал
              {
                filters.gym && !gyms.loading && (
                  <Typography variant='caption' color='primary' component='div'>
                    {currentGym?.shortName}
                  </Typography>
                )
              }
            </TableCell>
            <TableCell onClick={startFilterEditing} className={classes.clickable}>
              Тип тренировки
              {
                filters.types.length > 0 && (
                  <Typography variant='caption' color='primary' component='div'>
                    Выбрано: {filters.types.length}
                  </Typography>
                )
              }
            </TableCell>
            <TableCell>Время</TableCell>
            <TableCell onClick={startFilterEditing} className={classes.clickable}>
              Тренер
              {
                filters.trainer && !trainers.loading && (
                  <Typography variant='caption' color='primary' component='div'>
                    {currentTrainer?.lastName} {currentTrainer?.firstName}
                  </Typography>
                )
              }
            </TableCell>
            <TableCell onClick={startFilterEditing} className={classes.clickable}>
              Значение
              {
                !loading && (
                  <>
                    <Typography color='primary' variant='caption' component='div'>
                      {trainings.reduce((res, a) => res + a.hours, 0)} бч
                    </Typography>
                    <Typography color='secondary' variant='caption' component='div'>
                      {trainings.reduce((res, a) => res + a.people, 0)} чел
                    </Typography>
                  </>
                )
              }
            </TableCell>
            <TableCell>
              Контакты
              {
                !loading && (
                  <>
                    <Typography color='secondary' variant='caption' component='div'>
                      {uniq(trainings.reduce((res: ITraining['contacts'], a) => [...res, ...a.contacts], []).map(c => `${c.surname} ${c.name}`)).length} контактов
                    </Typography>
                  </>
                )
              }
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {
            loading && (
              <TableRow>
                <TableCell colSpan={7}>
                  <Grid container={true}>
                    <Box margin='auto'>
                      <CircularProgress />
                    </Box>
                  </Grid>
                </TableCell>
              </TableRow>
            )
          }
          {
            !loading && trainings
              .sort((a, b) => {
                if (a.date !== b.date) {
                  return moment(b.date).diff(a.date)
                }

                return b.endTime - a.endTime
              })
              .map(tr => (
                <TableRow key={tr._id}>
                  <TableCell>{moment(tr.date).format('DD.MM')}</TableCell>
                  <TableCell>{tr.gym.shortName}</TableCell>
                  <TableCell>
                    {trainingTypes.find(t => t.id === tr.type)?.text}
                  </TableCell>
                  <TableCell>
                    {getTimeLabel(tr.startTime)} - {getTimeLabel(tr.endTime)}
                  </TableCell>
                  <TableCell>
                    {tr.trainer?.lastName} {tr.trainer?.firstName}
                  </TableCell>
                  <TableCell>
                    <Typography color={tr.valueType === HOURS_TYPE ? 'primary' : 'secondary'}>
                      {
                        tr.valueType === HOURS_TYPE
                          ? `${tr.hours} бч`
                          : `${tr.people} чел`
                      }
                    </Typography>
                  </TableCell>
                  <TableCell>
                    {
                      tr.contacts.map((contact: any) => (
                        <div key={contact._id}>
                          {contact.surname} {contact.name}
                        </div>
                      ))
                    }
                  </TableCell>
                </TableRow>
              ))
          }
        </TableBody>
      </Table>
      <Dialog open={openedFiltersDialog} onClose={close} maxWidth='xs' fullWidth={true}>
        <FiltersDialog />
      </Dialog>
    </Paper>
  )
}

export default RecordsPage
