import React from 'react'

import Avatar from '@material-ui/core/Avatar'

import { useDrag } from 'react-dnd'

import useStyles from './styles'

const DragableAvatar = ({ type, source, trainer, ...rest }: any) => {
  const classes = useStyles()

  const [{ isDragging }, drag] = useDrag({
    item: { type, source, trainer },
    collect: monitor => ({
      isDragging: !!monitor.isDragging(),
    }),
  })

  return <Avatar {...rest} ref={drag} className={classes.avatar} />
}

export default DragableAvatar
