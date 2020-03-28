import React from 'react'
import clsx from 'clsx'

import Grid from '@material-ui/core/Grid'
import TableCell from '@material-ui/core/TableCell'

import { trainerSchedule, trainers } from '../data'

import TrainerAvatar from './trainer-avatar'

import { useSelector } from 'store'

import useStyles from './styles'

const mappedTrainerSchedule = trainerSchedule.map(ts => ({
  times: ts.times,
  trainer: trainers.find(tr => tr.id === ts.id),
}))

interface IProps {
  time: number
}

const TrainerBodyCell = ({ time }: IProps) => {
  const classes = useStyles()
  const openedTrainers = useSelector(state => state.schedule.page.openedTrainers)

  return (
    <TableCell padding='none' className={clsx(openedTrainers && classes.trainersColumnShift)}>
      <Grid container={true} wrap='nowrap'>
        {
          mappedTrainerSchedule.map((ts, index) => (
            ts.times.find(t => t === time)
              ? (
                <TrainerAvatar
                  time={time}
                  trainer={ts.trainer}
                  key={ts.trainer?.id}
                  showBadge={openedTrainers}
                  className={index > 0 ? clsx(classes.trainerAvatar, openedTrainers && classes.openedTrainerAvatar) : undefined}
                />
              )
              : (
                <div className={clsx(index === 0 ? classes.firstEmptyTrainerAvatar : classes.emptyTrainerAvatar, openedTrainers && classes.openedTrainerAvatar)} key={ts.trainer?.id}/>
              )
          ))
        }
      </Grid>
    </TableCell>
  )
}

export default TrainerBodyCell
