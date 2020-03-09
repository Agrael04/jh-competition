import React from 'react'

import { useQuery } from '@apollo/react-hooks'

import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper'

import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import Divider from '@material-ui/core/Divider'
import CircularProgress from '@material-ui/core/CircularProgress'

import { useSelector } from 'store'
import { times, resources, trainerSchedule, trainers } from './data'

import TrainingDialog from './components/training-dialog'

import Toolbar from './toolbar'
import TrainerAvatar from './trainer-avatar'
import TrainingCell from './training-cell'

import removeTimeFromDate from 'utils/remove-time-from-date'
import GET_TRAININGS from './queries/get-trainings'

const mappedTrainerSchedule = trainerSchedule.map(ts => ({
  time: ts.time,
  trainers: ts.trainers.map(t => trainers.find(tr => tr.id === t)),
}))

const SchedulePage = () => {
  const date = useSelector(state => state.schedule.currentDate)

  const { data, loading } = useQuery(GET_TRAININGS, {
    variables: {
      date: removeTimeFromDate(date),
    },
  })

  return (
    <Paper>
      <Toolbar />
      <Divider />
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>{'Время'}</TableCell>
            <TableCell>{'Тренера'}</TableCell>
            {
              resources.map(r => (
                <TableCell key={r.id} align='center'>{r.name}</TableCell>
              ))
            }
          </TableRow>
        </TableHead>
        <TableBody>
          {
            times.map(time => (
              <TableRow key={time}>
                <TableCell>
                  {time}
                </TableCell>
                <TableCell padding='none'>
                  <Grid container={true}>
                    {
                      mappedTrainerSchedule.find(ts => ts.time === time)?.trainers.map(trainer => (
                        <TrainerAvatar
                          time={time}
                          trainer={trainer}
                          key={trainer?.id}
                          count={data?.trainings.filter((tr: any) => tr.time === time && tr.trainer === trainer?.id).length}
                        />
                      ))
                    }
                  </Grid>
                </TableCell>
                {
                  resources.map(r => (
                    loading ? (
                      <TableCell align='center' padding='none'>
                        <CircularProgress />
                      </TableCell>
                    ) : (
                        <TrainingCell
                          id={data?.trainings.find((tr: any) => tr.time === time && tr.resource === r.id)?._id}
                          resource={r.id}
                          time={time}
                          key={r.id}
                        />
                      )

                  ))
                }

              </TableRow>
            ))
          }
        </TableBody>
      </Table>
      <TrainingDialog />
    </Paper>
  )
}

export default SchedulePage
