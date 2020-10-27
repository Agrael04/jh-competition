import React, { useCallback, useMemo } from 'react'
import { useActions } from 'store'

import ButtonBase from '@material-ui/core/ButtonBase'
import Zoom from '@material-ui/core/Zoom'

import { useTrainingDrop } from './dnd'

import useStyles from './styles'

interface IProps {
  time: number
  resource: string
}

const EmptyItem = ({ time, resource }: IProps) => {
  const classes = useStyles()
  const actions = useActions()

  const handleCreateClick = useCallback(
    e => {
      e.stopPropagation()
      actions.schedule.page.openCreateTrainingDialog(resource, time)
    },
    [actions, resource, time]
  )

  const [{ color }, drop] = useTrainingDrop(time, resource)

  const backgroundStyle = useMemo(
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
