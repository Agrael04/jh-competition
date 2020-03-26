import React from 'react'

import TableCell from '@material-ui/core/TableCell'

import useGetTrainingsQuery from '../queries/get-trainings'

import TrainingItem from './training-item'

import useStyles from './styles'

interface IProps {
  time: number
  resource: number
}

const TrainingCell = ({ time, resource }: IProps) => {
  const classes = useStyles()

  const { data } = useGetTrainingsQuery()

  const training = React.useMemo(
    () => data?.trainings.find(tr => (time >= tr?.startTime && time < tr?.endTime) && tr?.resource === resource),
    [data, time, resource]
  )

  const duration = React.useMemo(
    () => {
      const startTime = training?.startTime || 0
      const endTime = training?.endTime || 0

      return endTime - startTime
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
    <TableCell align='center' padding='none' className={classes.resourceTd} rowSpan={duration ? duration : 1}>
      <div className={classes.cellWrap}>
        <TrainingItem time={time} resource={resource} id={training?._id} />
      </div>
    </TableCell>
  )
}

export default TrainingCell
