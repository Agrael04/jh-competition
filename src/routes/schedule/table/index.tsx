import React from 'react'

import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableHead from '@material-ui/core/TableHead'

import times from 'data/times'

import HeaderRow from './header-row'
import TimeRow from './time-row'
import LastTimeRow from './last-time-row'

export default function TrainingsTable() {
  return (
    <Table stickyHeader={true}>
      <TableHead>
        <HeaderRow />
      </TableHead>
      <TableBody>
        {
          times
            .filter((time, index, arr) => index < arr.length - 1)
            .map((time, index) => (
              <TimeRow key={time.id} time={time} index={index} />
            ))
          }
        <LastTimeRow />
      </TableBody>
    </Table>
  )
}

