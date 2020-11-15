import React from 'react'

import TableRow from '@material-ui/core/TableRow'

import times from 'data/times'

import TimeCell from './time-cell'
import TrainingCells from './training-cells'

interface IProps {
  index: number
  time: typeof times[number]
}

const TimeRow = ({ time, index }: IProps) => {
  return (
    <TableRow>
      <TimeCell time={time} index={index} />
      <TrainingCells time={time} />
    </TableRow>
  )
}

export default TimeRow
