import React from 'react'
import clsx from 'clsx'

import TableCell from '@material-ui/core/TableCell'

import useGetTrainingsQuery from '../queries/get-trainings'

import TrainingItem from './training-item'

import useStyles from './styles'

interface IProps {
  time: number
  resource: string
  className?: string
}

const TrainingCell = ({ time, resource, className }: IProps) => {
  const classes = useStyles()

  const { data } = useGetTrainingsQuery()

  const training = React.useMemo(
    () => data?.trainings.find(tr => (time >= tr?.startTime && time < tr?.endTime) && tr?.resource._id === resource),
    [data, time, resource]
  )

  const duration = React.useMemo(
    () => {
      const startTime = training?.startTime || 0
      const endTime = training?.endTime || 0

      return (endTime - startTime) || 1
    },
    [training]
  )

  const isOccupied = React.useMemo(
    () => training && training.startTime !== time,
    [training, time]
  )

  if (isOccupied) {
    return null
  }

  return (
    <TableCell align='center' padding='none' className={clsx(classes.resourceTd, (time + duration) % 2 && classes.secondaryTd, className)} rowSpan={duration}>
      <div className={classes.cellWrap}>
        <TrainingItem time={time} resource={resource} id={training?._id} />
      </div>
    </TableCell>
  )
}

export default TrainingCell
