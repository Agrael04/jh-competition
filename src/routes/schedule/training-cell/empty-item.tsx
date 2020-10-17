import React from 'react'
import { useDrop } from 'react-dnd'
import { useActions, useSelector } from 'store'

import ButtonBase from '@material-ui/core/ButtonBase'
import Zoom from '@material-ui/core/Zoom'

import useUpdateTrainingResource from '../mutations/update-training-resource'
import useGetSchedulesQuery, { isTrainerAvailable } from '../queries/get-schedules'
import useGetTrainingResourcesQuery from '../queries/get-training-resources'

import useStyles from './styles'

interface IProps {
  time: number
  resource: string
}

const EmptyItem = ({ time, resource }: IProps) => {
  const classes = useStyles()
  const actions = useActions()
  const { gym } = useSelector(state => ({
    gym: state.schedule.page.filters.gym?.link!,
  }))

  const { data } = useGetSchedulesQuery()

  const trainingResources = useGetTrainingResourcesQuery()
  const updateTrainingResource = useUpdateTrainingResource()

  const handleCreateClick = React.useCallback(
    e => {
      e.stopPropagation()
      actions.schedule.page.openCreateTrainingDialog(resource, time)
    },
    [actions, resource, time]
  )

  const onDrop = (_id: string, trainer: string, duration: number) => {
    const nextResouce = trainingResources.data?.trainingResources.find(tr => tr.resource._id === resource && tr.startTime > time)
    const endTime = Math.min(time + duration, (nextResouce?.startTime || Infinity))

    const isAvailable = trainer && isTrainerAvailable(data?.trainerSchedules || [], trainer, gym, time, endTime)

    updateTrainingResource({
      _id,
      startTime: time,
      endTime,
      resource: { link: resource },
      trainer: isAvailable ? { link: trainer! } : undefined,
    })
  }

  const [{ color }, drop] = useDrop({
    accept: 'TRAINING_RESOURCE_ITEM',
    drop: (item: any) => onDrop(item?._id, item?.trainerId, item?.duration),
    collect: monitor => ({
      isOver: !!monitor.isOver(),
      color: !!monitor.isOver() && monitor.getItem()?.color,
      _id: !!monitor.isOver() && monitor.getItem()?._id,
      trainerId: !!monitor.isOver() && monitor.getItem()?.trainerId,
    }),
  })

  const backgroundStyle = React.useMemo(
    () => (color) ? ({ backgroundColor: color[200] }) : undefined,
    [color]
  )

  return (
    <div className={classes.resource} ref={drop}>
      <Zoom in={true}>
        <ButtonBase onDoubleClick={handleCreateClick} className={classes.button} style={backgroundStyle}>
          {' '}
        </ButtonBase>
      </Zoom>
    </div>
  )
}

export default EmptyItem
