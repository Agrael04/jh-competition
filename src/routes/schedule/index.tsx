import React from 'react'
import { useSelector } from 'react-redux'
import { IStoreState } from '../../store'

import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper'
import Badge from '@material-ui/core/Badge'

import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'

import { times, resources } from './data'

import RecordTrainingDialog from './components/record-training-dialog'

import TrainersCell from './trainers-cell'
import RecordCell from './record-cell'

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
                <TrainersCell time={time} />
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
