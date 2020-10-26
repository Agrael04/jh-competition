import React, { useMemo } from 'react'
import clsx from 'clsx'

import Grid from '@material-ui/core/Grid'

import TableCell from '../table-cell'
import useGetSchedulesQuery from '../../queries/get-schedules'

import TrainerAvatar from './trainer-avatar'

import { useSelector } from 'store'

import useStyles from './styles'

interface IProps {
  time: number
  primaryRow?: boolean
  activeRow?: boolean
}

const TrainerBodyCell = ({ time, primaryRow, activeRow }: IProps) => {
  const classes = useStyles()
  const openedTrainers = useSelector(state => state.schedule.page.openedTrainers)
  const activeGym = useSelector(state => state.schedule.page.filters.gym)
  const { data } = useGetSchedulesQuery()

  const trainers = useMemo(
    () => {
      return data?.trainerSchedules.map(t => t.trainer).filter((tr, index, arr) => arr.indexOf(tr) === index) || []
    },
    [data]
  )

  return (
    <TableCell padding='none' className={clsx(classes.trainersTd, openedTrainers && classes.trainersColumnShift)} primaryRow={primaryRow} activeRow={activeRow}>
      <Grid container={true} wrap='nowrap'>
        {
          trainers.map((tr, index) => (
            data?.trainerSchedules
              .filter(s => s.gym._id === activeGym)
              .find(s => s.time === time && s.trainer._id === tr._id)
              ? (
                <TrainerAvatar
                  time={time}
                  trainer={tr}
                  key={tr._id}
                  showBadge={openedTrainers}
                  className={index > 0 ? clsx(classes.trainerAvatar, openedTrainers && classes.openedTrainerAvatar) : undefined}
                />
              )
              : (
                <div className={clsx(index === 0 ? classes.firstEmptyTrainerAvatar : classes.emptyTrainerAvatar, openedTrainers && classes.openedTrainerAvatar)} key={tr._id} />
              )
          ))
        }
      </Grid>
    </TableCell>
  )
}

export default TrainerBodyCell
