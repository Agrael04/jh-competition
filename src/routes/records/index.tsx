import React, { useCallback, useMemo } from 'react'
import moment from 'moment'
import { uniq } from 'lodash'
import { useSelector, useActions } from 'store'

import Paper from '@material-ui/core/Paper'

import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'

import Grid from '@material-ui/core/Grid'
import CircularProgress from '@material-ui/core/CircularProgress'
import Box from '@material-ui/core/Box'
import Dialog from '@material-ui/core/Dialog'
import Typography from '@material-ui/core/Typography'

import Header from './header'
import FiltersDialog from './filters-dialog'

import useGetRecords, { IRecord } from './graphql/get-records'

import { getTimeLabel } from 'data/times'
import { trainingTypes, GROUP_TRAININGS } from 'data/training-types'

import useStyles from './styles'

import XLSX from 'xlsx'

const PEOPLE_TYPE = 'PEOPLE'
const HOURS_TYPE = 'HOURS'

export interface ITraining {
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

const generateXLSX = (records: any[][], trainers: any[][], dates: any[][]) => {
  const wb = XLSX.utils.book_new()
  const recordsSheet = XLSX.utils.aoa_to_sheet(records)
  const trainersSheet = XLSX.utils.aoa_to_sheet(trainers)
  const datesSheet = XLSX.utils.aoa_to_sheet(dates)

  XLSX.utils.book_append_sheet(wb, recordsSheet, 'Записи до конца месяца')
  XLSX.utils.book_append_sheet(wb, datesSheet, 'По дням')
  XLSX.utils.book_append_sheet(wb, trainersSheet, 'Тренера')
  XLSX.writeFile(wb, `Записи.xlsx`)
}

const prepareData = (trainings: ITraining[]) => {
  const trainers = uniq(trainings.map(tr => `${tr.trainer?.lastName} ${tr.trainer?.firstName}`))
    .map(trainer => {
      const trs = trainings.filter(tr => `${tr.trainer?.lastName} ${tr.trainer?.firstName}` === trainer)

      return ({
        name: trainer,
        activeHours: trs
          .filter(tr => moment(tr.date).diff(moment([2020, 6, 15])) <= 0)
          .reduce((res, tr) => {
            return res + (tr.valueType === HOURS_TYPE ? tr.hours : 0)
          }, 0),
        hours: trs
          .reduce((res, tr) => {
            return res + (tr.valueType === HOURS_TYPE ? tr.hours : 0)
          }, 0),
        activePeople: trs
          .filter(tr => moment(tr.date).diff(moment([2020, 6, 15])) <= 0)
          .reduce((res, tr) => {
            return res + (tr.valueType === PEOPLE_TYPE ? tr.people : 0)
          }, 0),
        people: trs
          .reduce((res, tr) => {
            return res + (tr.valueType === PEOPLE_TYPE ? tr.people : 0)
          }, 0),
        days: uniq(trs.map(tr => tr.date)).length,
      })
    })

  const dates = uniq(trainings.map(tr => tr.date)).map(date => ({
    date: moment(date).format('DD.MM.YYYY'),
    hours: trainings.filter(tr => tr.date === date).reduce((res, tr) => res + tr.hours, 0),
    people: trainings.filter(tr => tr.date === date).reduce((res, tr) => res + tr.people, 0),
  }))

  const recordsSheet = [
    ['Дата', 'Зал', 'Тип тренировки', 'Время начало', 'Время конца', 'Тренер', 'Батуто-часы', 'Люди', 'Контакты'],
    ...trainings.map(tr => ([
      moment(tr.date).format('DD.MM.YYYY'),
      tr.gym.shortName,
      trainingTypes.find(t => t.id === tr.type)?.text,
      getTimeLabel(tr.startTime),
      getTimeLabel(tr.endTime),
      `${tr.trainer?.lastName} ${tr.trainer?.firstName}`,
      tr.valueType === HOURS_TYPE ? tr.hours : '',
      tr.valueType === PEOPLE_TYPE ? tr.people : '',
      tr.contacts.map(contact => `${contact.surname} ${contact.name}`).join(', '),
    ])),
  ]

  const trainersSheet = [
    ['', 'Б-ч', 'Люди', 'Дни'],
    ...trainers.map(tr => ([
      tr.name,
      `${tr.activeHours}(${tr.hours})`,
      `${tr.activePeople}(${tr.people})`,
      tr.days,
    ])),
  ]

  const datesSheet = [
    ['Дата', 'Б-ч', 'Люди'],
    ...dates.map(date => ([
      date.date,
      date.hours,
      date.people,
    ])),
    [],
    ['', dates.reduce((res, date) => res + date.hours, 0), dates.reduce((res, date) => res + date.people, 0)],
  ]

  return {
    recordsSheet,
    trainersSheet,
    datesSheet,
  }
}

const convertRecordsToTrainings = (trainingRecords?: IRecord[]) => {
  const trainings: ITraining[] = []

  trainingRecords?.forEach(tr => {
    const isMulti = (
      tr.training.type === GROUP_TRAININGS.GROUP ||
      tr.training.type === GROUP_TRAININGS.EVENT ||
      tr.training.type === GROUP_TRAININGS.SECTION
    )

    const index = trainings.findIndex(t => t._id === tr.training._id)

    if (index === -1) {
      const records = trainingRecords?.filter(t => t.training._id === tr.training._id)
      const duration = tr.resource.endTime - tr.resource.startTime

      const hours = !isMulti ? duration / 2 : tr.training.type === GROUP_TRAININGS.GROUP ? Math.max(1, records.length / 2) : 0
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
}

const RecordsPage = () => {
  const actions = useActions()
  const { openedFiltersDialog } = useSelector(state => state.records.page)
  const classes = useStyles()

  const { data, loading } = useGetRecords()

  const trainings = useMemo(
    () => {
      return convertRecordsToTrainings(data?.trainingRecords)
    }, [data]
  )

  const handleXLSXClick = useCallback(
    () => {
      const { recordsSheet, trainersSheet, datesSheet } = prepareData(trainings)

      generateXLSX(recordsSheet, trainersSheet, datesSheet)
    }, [trainings]
  )

  const startFilterEditing = useCallback(
    () => {
      actions.records.page.startFilterUpdate()
    }, [actions]
  )

  const close = useCallback(
    () => {
      actions.records.page.cancelFilterUpdate()
    }, [actions]
  )

  return (
    <Paper className={classes.rootPaper}>
      <Header
        handleXLSXClick={handleXLSXClick}
        startFilterEditing={startFilterEditing}
        trainings={trainings}
      />
      <Table stickyHeader={true}>
        <TableHead>
          <TableRow>
            <TableCell onClick={startFilterEditing} className={classes.clickable}>
              Дата
            </TableCell>
            <TableCell onClick={startFilterEditing} className={classes.clickable}>
              Зал
            </TableCell>
            <TableCell onClick={startFilterEditing} className={classes.clickable}>
              Тип тренировки
            </TableCell>
            <TableCell>Время</TableCell>
            <TableCell onClick={startFilterEditing} className={classes.clickable}>
              Тренер
            </TableCell>
            <TableCell onClick={startFilterEditing} className={classes.clickable}>
              Значение
            </TableCell>
            <TableCell>
              Контакты
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
