import React from 'react'

import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper'

import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'

import { useActions } from 'store'
import { times, resources, trainerSchedule, trainers } from './data'

import TrainingDialog from './components/training-dialog'

import TrainerAvatar from './trainer-avatar'
import TrainingCell from './training-cell'

const mappedTrainerSchedule = trainerSchedule.map(ts => ({
  time: ts.time,
  trainers: ts.trainers.map(t => trainers.find(tr => tr.id === t)),
}))

const SchedulePage = () => {
  const actions = useActions()

  React.useEffect(
    () => {
      actions.trainings.readTrainings()
    }, [actions]
  )
  return (
    <Paper>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Time</TableCell>
            <TableCell>Trainers</TableCell>
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
                <TableCell padding='none'>
                  {time}
                </TableCell>
                <TableCell padding='none'>
                  <Grid container={true}>
                    {
                      mappedTrainerSchedule.find(ts => ts.time === time)?.trainers.map(tr => (
                        <TrainerAvatar
                          time={time}
                          trainer={tr}
                          key={tr?.id}
                        />
                      ))
                    }
                  </Grid>
                </TableCell>
                {
                  resources.map(r => (
                    <TrainingCell
                      resource={r.id}
                      time={time}
                      key={r.id}
                    />
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
