import React from 'react'
import clsx from 'clsx'

import Grid from '@material-ui/core/Grid'
import TableCell from '@material-ui/core/TableCell'

import useGetSchedulesQuery from '../queries/get-schedules'

import TrainerAvatar from './trainer-avatar'

import { useSelector } from 'store'

import useStyles from './styles'

interface IProps {
  time: number
  trainers: number[]
  className?: string
}

const TrainerBodyCell = ({ time, trainers, className }: IProps) => {
  const classes = useStyles()
  const openedTrainers = useSelector(state => state.schedule.page.openedTrainers)
  const { data } = useGetSchedulesQuery()

  return (
    <TableCell padding='none' className={clsx(classes.trainersTd, openedTrainers && classes.trainersColumnShift, className)}>
      <Grid container={true} wrap='nowrap'>
        {
          trainers.map((tr, index) => (
            data?.trainerSchedules.find(s => s.time === time && s.trainer === tr)
              ? (
                <TrainerAvatar
                  time={time}
                  id={tr}
                  key={tr}
                  showBadge={openedTrainers}
                  className={index > 0 ? clsx(classes.trainerAvatar, openedTrainers && classes.openedTrainerAvatar) : undefined}
                />
              )
              : (
                <div className={clsx(index === 0 ? classes.firstEmptyTrainerAvatar : classes.emptyTrainerAvatar, openedTrainers && classes.openedTrainerAvatar)} key={tr} />
              )
          ))
        }
      </Grid>
    </TableCell>
  )
}

export default TrainerBodyCell
