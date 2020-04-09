import React from 'react'

import TableCell from '../table-cell'

import useGetTrainingsQuery from '../queries/get-trainings'

import TrainingItem from './training-item'

import { useSelector } from 'store'

import useStyles from './styles'

interface IProps {
  time: number
  resource: string
  secondaryRow?: boolean
}

const TrainingCell = ({ time, resource, secondaryRow }: IProps) => {
  const classes = useStyles()
  const activeTime = useSelector(state => state.schedule.page.activeTime)

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
    <TableCell
      align='center'
      padding='none'
      className={classes.resourceTd}
      rowSpan={duration}
      primaryCol={!secondaryRow}
      secondaryCol={secondaryRow}
      primaryRow={!!((time + duration) % 2)}
      activeRow={((time + duration) === activeTime)}
    >
      <div className={classes.cellWrap}>
        <TrainingItem time={time} resource={resource} id={training?._id} />
      </div>
    </TableCell>
  )
}

export default TrainingCell
