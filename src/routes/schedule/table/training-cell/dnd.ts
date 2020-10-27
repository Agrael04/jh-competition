import { useMemo, useCallback } from 'react'
import { useDrop, useDrag } from 'react-dnd'
import { useSelector } from 'store'

import blueGrey from '@material-ui/core/colors/blueGrey'
import red from '@material-ui/core/colors/red'

import getColorPallete from 'utils/get-color-pallete'

import useUpdateTrainingResource from '../../mutations/update-training-resource'
import useGetSchedulesQuery, { isTrainerAvailable } from '../../queries/get-schedules'
import useGetTrainingResourcesQuery from '../../queries/get-training-resources'
import useGetTrainingResourceQuery from '../../queries/get-training-resource'

const ACCEPT_TYPE = 'TRAINING_RESOURCE_ITEM'

interface IDraggableItem {
  type: typeof ACCEPT_TYPE
  color: string,
  _id: string
  trainerId: string
  duration: number
}

export function useTrainingDrop(time: number, resource: string) {
  const gym = useSelector(state => state.schedule.page.filters.gym)

  const { data } = useGetSchedulesQuery()

  const trainingResources = useGetTrainingResourcesQuery()
  const updateTrainingResource = useUpdateTrainingResource()

  const drop = useCallback(
    (item: IDraggableItem) => {
      const nextResouce = trainingResources.data?.trainingResources.find((tr: any) => tr.resource._id === resource && tr.startTime > time)
      const endTime = Math.min(time + item.duration, (nextResouce?.startTime || Infinity))

      const isAvailable = item.trainerId && isTrainerAvailable(data?.trainerSchedules || [], item.trainerId, gym, time, endTime)

      updateTrainingResource(
        item._id,
        {
          startTime: time,
          endTime,
          resource: { link: resource },
          trainer: isAvailable ? { link: item.trainerId } : undefined,
        }
      )
    },
    [data, gym, resource, time, trainingResources, updateTrainingResource]
  )

  return useDrop({
    accept: ACCEPT_TYPE,
    drop,
    collect: monitor => ({
      isOver: !!monitor.isOver(),
      color: !!monitor.isOver() && monitor.getItem()?.color,
      _id: !!monitor.isOver() && monitor.getItem()?._id,
      trainerId: !!monitor.isOver() && monitor.getItem()?.trainerId,
    }),
  })
}

export function useTrainingDrag(id: string) {
  const trainingResourceRes = useGetTrainingResourceQuery(id)

  const tResource = trainingResourceRes.data?.trainingResource
  const records = trainingResourceRes.data?.trainingRecords

  const trainer = useMemo(
    () => tResource?.trainer,
    [tResource]
  )

  const color = useMemo(
    () => {
      if (records?.filter(r => r.status === 'DEBT').length! > 0) {
        return red
      }

      if (records?.filter(r => r.status === 'CLOSED').length === records?.length && records?.length! > 0) {
        return blueGrey
      }

      return getColorPallete(trainer?.color)
    },
    [trainer, records]
  )

  return useDrag({
    item: {
      type: ACCEPT_TYPE,
      color,
      _id: tResource?._id,
      trainerId: trainer?._id,
      duration: tResource ? (tResource.endTime - tResource.startTime) : 0,
    },
  })
}
