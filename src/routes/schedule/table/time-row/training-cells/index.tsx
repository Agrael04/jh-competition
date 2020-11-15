import React from 'react'
import { useSelector } from 'store'

import times from 'data/times'

import TrainingCell from '../../training-cell'

import useGetGymsQuery from '../../../queries/get-gyms'

interface IProps {
  time: typeof times[number]
}

export default function TimeRow({ time }: IProps) {
  const gyms = useGetGymsQuery()
  const activeResources = useSelector(state => state.schedule.page.filters.resources)

  return (
    <>
      {
        gyms.data?.resources
          .filter(tr => activeResources.find(r => r === tr._id))
          .map((r, index) => (
            <TrainingCell
              resource={r._id}
              time={time.id}
              key={r._id}
              secondaryRow={index === 0}
            />
          ))
      }
    </>
  )
}
