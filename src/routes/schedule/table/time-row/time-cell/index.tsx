import React from 'react'

import Typography from '@material-ui/core/Typography'

import times from 'data/times'

import TableCell from '../../table-cell'

import { useSelector } from 'store'

import useStyles from '../../styles'

interface IProps {
  index: number
  time: typeof times[number]
}

export default function TimeCell({ time, index }: IProps) {
  const classes = useStyles()

  const activeTime = useSelector(state => state.schedule.page.activeTime)

  if (index % 2 !== 0) {
    return null
  }

  return (
    <TableCell className={classes.timeTd} rowSpan={2} primaryRow={true} activeRow={time.id === activeTime - 2}>
      <Typography>
        {time.label}
      </Typography>
    </TableCell>
  )
}
