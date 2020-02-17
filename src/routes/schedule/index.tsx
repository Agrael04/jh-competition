import React from 'react'

import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper'

import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'

import { times, resources, trainers, trainerSchedule } from './data'

import { DND_CREATE_TRAINING } from './constants'

import DragableAvatar from './components/dragable-avatar'
import RecordTrainingDialog from './components/record-training-dialog'

import RecordCell from './record-cell'

const mappedTrainerSchedule = trainerSchedule.map(ts => ({
  time: ts.time,
  trainers: ts.trainers.map(t => trainers.find(tr => tr.id === t)),
}))

const SchedulePage = ({ }) => {
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
                <TableCell>
                  <Grid container={true}>
                    {
                      (mappedTrainerSchedule.find(ts => ts.time === time) as any).trainers.map((tr: any) => (
                        <DragableAvatar
                          type={DND_CREATE_TRAINING}
                          source={{ time, resource: null }}
                          trainer={tr.id}
                          tooltipRows={[tr.name]}
                          src={tr.avatar}
                          key={tr.id}
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
