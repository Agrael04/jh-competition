import React from 'react'

import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper'

import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'

import { times, resources, trainerSchedule, trainers } from './data'

import RecordTrainingDialog from './components/record-training-dialog'

import TrainerAvatar from './trainer-avatar'
import RecordCell from './record-cell'

const mappedTrainerSchedule = trainerSchedule.map(ts => ({
  time: ts.time,
  trainers: ts.trainers.map(t => trainers.find(tr => tr.id === t)),
}))

const SchedulePage = () => {
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
                <TableCell>
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
                    <RecordCell
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
      <RecordTrainingDialog />
    </Paper>
  )
}

export default SchedulePage
