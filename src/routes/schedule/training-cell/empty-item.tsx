import React from 'react'
import { useDrop } from 'react-dnd'
import { useActions } from 'store'

import ButtonBase from '@material-ui/core/ButtonBase'
import Zoom from '@material-ui/core/Zoom'

import useUpdateTrainingResource from '../mutations/update-training-resource'

import useStyles from './styles'

interface IProps {
  time: number
  resource: string
}

const EmptyItem = ({ time, resource }: IProps) => {
  const classes = useStyles()
  const actions = useActions()

  const updateTrainingResource = useUpdateTrainingResource()

  const handleCreateClick = React.useCallback(
    e => {
      e.stopPropagation()
      actions.schedule.page.openCreateTrainingDialog(resource, time)
    },
    [actions, resource, time]
  )

  const onDrop = (_id: string) => {
    updateTrainingResource({
      _id,
      startTime: time,
      endTime: time + 1,
      resource: { link: resource },
    })
  }

  const [{ color }, drop] = useDrop({
    accept: 'TRAINING_RESOURCE_ITEM',
    drop: (item: any) => onDrop(item?._id),
    collect: monitor => ({
      isOver: !!monitor.isOver(),
      color: !!monitor.isOver() && monitor.getItem()?.color,
      _id: !!monitor.isOver() && monitor.getItem()?._id,
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
