import React from 'react'

import CircularProgress from '@material-ui/core/CircularProgress'

import times from 'data/times'

import { TrainerBodyCell } from '../../trainer-cell'
import TableCell from '../../table-cell'

import useGetSchedulesQuery from '../../../queries/get-schedules'

import { useSelector } from 'store'

interface IProps {
  index: number
  time: typeof times[number]
}

export default function TrainerCell({ time, index }: IProps) {
  const schedules = useGetSchedulesQuery()
  const activeTime = useSelector(state => state.schedule.page.activeTime)

  if (schedules.loading && index === 0) {
    return (
      <TableCell align='center' padding='none' rowSpan={times.length - 1}>
        <CircularProgress />
      </TableCell>
    )
  }

  if (schedules.loading && index !== 0) {
    return null
  }

  return (
    <TrainerBodyCell
      time={time.id}
      primaryRow={index % 2 !== 0}
      activeRow={time.id === activeTime - 1}
    />
  )
}
