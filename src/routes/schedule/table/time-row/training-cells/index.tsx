import React from 'react'

import times from 'data/times'

import useGetSchedulesQuery from '../../../queries/get-schedules'
import useGetGymsQuery from '../../../queries/get-gyms'

import InnerCells from './inner-cells'

interface IProps {
  index: number
  time: typeof times[number]
}

export default function TrainingCells(props: IProps) {
  const schedules = useGetSchedulesQuery()
  const gyms = useGetGymsQuery()

  if (schedules.loading || gyms.loading) {
    return null
  }

  return (
    <InnerCells {...props}/>
  )
}
