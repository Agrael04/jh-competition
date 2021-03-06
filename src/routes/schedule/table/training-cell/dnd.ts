import { useMemo } from 'react'
import { useDrop, useDrag, DragSourceMonitor } from 'react-dnd'
import moment from 'moment'
import { useSelector } from 'store'

import useCreateNewTraining from '../../mutations/new-training/create'
import useUpdateNewTraining from '../../mutations/new-training/update'
import useGetSchedulesQuery, { isTrainerAvailable } from '../../queries/get-schedules'

import { useGetTrainingResourceQuery, useReadNextTrainingResource, IGetTrainingResourceResponse } from '../../queries/get-training-resource'

const ACCEPT_TYPE = 'TRAINING_RESOURCE_ITEM'

interface IDraggableItem {
  type: typeof ACCEPT_TYPE
  trainer?: string | undefined
  duration: number

  resource: IGetTrainingResourceResponse['newTraining']
}

interface DropResult {
  dropEffect: string
  time: number
  resource: string
}

export function useGetEndTime() {
  const readNextTrainingResource = useReadNextTrainingResource()

  return (time: number, resource: string, tResourceId: string | null, maxDuration: number) => {
    let nextResource = readNextTrainingResource(time, resource)
    if (tResourceId && nextResource?.newTraining?._id === tResourceId) {
      nextResource = readNextTrainingResource(nextResource.newTraining.endTime, resource)
    }

    return Math.min(nextResource?.newTraining?.startTime || Infinity, time + maxDuration)
  }
}

export function useTrainingDrop(time: number, resource: string) {
  const gym = useSelector(state => state.ui.pages.schedule.page.filters.gym)
  const { data } = useGetSchedulesQuery()
  const getEndTime = useGetEndTime()

  return useDrop({
    accept: ACCEPT_TYPE,
    drop: () => ({
      time,
      resource,
    }),
    collect: monitor => {
      if (!monitor.isOver()) {
        return {
          isOver: false,
          color: undefined,
          duration: 0,
        }
      }

      const item = monitor.getItem()

      const endTime = getEndTime(time, resource, item.resource._id, item.duration)

      const duration = Math.min(item.duration, endTime - time)

      const trainerId = item.resource.trainer?._id

      const isAvailable = trainerId && isTrainerAvailable(data?.trainerSchedules || [], trainerId, gym, time, endTime)

      return ({
        isOver: true,
        duration,
        color: isAvailable ? item?.resource.trainer?.color : undefined,
      })
    },
  })
}

export function useTrainingDrag(time: number, resource: string) {
  const gym = useSelector(state => state.ui.pages.schedule.page.filters.gym)
  const trainingResourceRes = useGetTrainingResourceQuery(time, resource)
  const { data } = useGetSchedulesQuery()
  const getEndTime = useGetEndTime()

  const updateNewTraining = useUpdateNewTraining()
  const createNewTraining = useCreateNewTraining()

  const tResource = trainingResourceRes?.data?.newTraining
  const records = trainingResourceRes?.data?.trainingRecords

  const trainer = useMemo(
    () => tResource?.trainer,
    [tResource]
  )

  const canDrag = useMemo(
    () => {
      if (records?.filter(r => r.status === 'DEBT').length! > 0) {
        return false
      }

      if (records?.filter(r => r.status === 'CLOSED').length === records?.length && records?.length! > 0) {
        return false
      }

      return true
    },
    [records]
  )

  const duration = useMemo(
    () => tResource ? tResource.endTime - tResource.startTime : 1,
    [tResource]
  )

  return useDrag({
    item: {
      type: ACCEPT_TYPE,
      trainer: trainer?._id,
      duration,
      resource: tResource!,
    },
    canDrag,
    end: (item: IDraggableItem | undefined, monitor: DragSourceMonitor) => {
      const dropResult: DropResult = monitor.getDropResult()

      if (!dropResult || !item?.resource || !tResource) {
        return
      }

      const duration = item.duration

      const endTime = getEndTime(dropResult.time, dropResult.resource, dropResult.dropEffect === 'move' ? item.resource._id : null, duration)

      const trainerId = item.resource.trainer?._id

      const isAvailable = trainerId && isTrainerAvailable(data?.trainerSchedules || [], trainerId, gym, dropResult.time, endTime)

      if (dropResult.dropEffect === 'move') {
        updateNewTraining(
          item.resource._id,
          {
            startTime: dropResult.time,
            endTime,
            resource: { link: dropResult.resource },
            trainer: isAvailable ? { link: trainerId } : undefined,
          }
        )
      } else if (dropResult.dropEffect === 'copy') {
        createNewTraining(
          {
            date: moment(item.resource.date),
            type: item.resource.type,
            gym: { link: item.resource.gym._id },
            note: item.resource.note,
            name: item.resource.name,
            startTime: dropResult.time,
            endTime,
            resource: { link: dropResult.resource },
            trainer: isAvailable ? { link: trainerId } : undefined,
          }
        )
      }
    },
  })
}
