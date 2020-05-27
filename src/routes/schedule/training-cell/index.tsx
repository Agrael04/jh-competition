import React from 'react'

import TableCell from '../table-cell'

import useGetTrainingResourcesQuery from '../queries/get-training-resources'

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

  const { data } = useGetTrainingResourcesQuery()

  const trainingResource = React.useMemo(
    () => {
      return data?.trainingResources.find(tr => (time >= tr?.startTime && time < tr?.endTime) && tr?.resource?._id === resource)
    },
    [data, time, resource]
  )

  const duration = React.useMemo(
    () => {
      const startTime = trainingResource?.startTime || 0
      const endTime = trainingResource?.endTime || 0

      return (endTime - startTime) || 1
    },
    [trainingResource]
  )

  const isOccupied = React.useMemo(
    () => trainingResource && trainingResource.startTime !== time,
    [trainingResource, time]
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
        <TrainingItem time={time} resource={resource} id={trainingResource?._id} />
      </div>
    </TableCell>
  )
}

export default TrainingCell
