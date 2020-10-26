import React from 'react'

import CircularProgress from '@material-ui/core/CircularProgress'

import times from 'data/times'

import TrainingCell from '../../training-cell'
import TableCell from '../../table-cell'

import useGetTrainingResourcesQuery from '../../../queries/get-training-resources'
import useGetGymsQuery from '../../../queries/get-gyms'

import { useSelector } from 'store'

interface IProps {
  index: number
  time: typeof times[number]
}

export default function TimeRow({ time, index }: IProps) {
  const trainingResources = useGetTrainingResourcesQuery()
  const gyms = useGetGymsQuery()
  const activeResources = useSelector(state => state.schedule.page.filters.resources)

  if ((trainingResources.loading || gyms.loading) && index === 0) {
    return (
      <TableCell align='center' padding='none' colSpan={activeResources.length || 1} rowSpan={times.length - 1} secondaryCol={true}>
        <CircularProgress />
      </TableCell>
    )
  }

  if ((trainingResources.loading || gyms.loading) && index !== 0) {
    return (
      null
    )
  }


  return (
    <>
      {
        gyms.data?.resources
          .filter(tr => activeResources.find(r => r === tr._id))
          .map((r, resourseIndex) => (
            <TrainingCell
              resource={r._id}
              time={time.id}
              key={r._id}
              secondaryRow={resourseIndex === 0}
            />
          ))
      }
    </>
  )
}
