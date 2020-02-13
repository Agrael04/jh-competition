import React from 'react'

import Avatar from '@material-ui/core/Avatar'

import { useDrag } from 'react-dnd'

const styles = { height: '64px', width: '64px' }

const DragableAvatar = ({ type, source, trainer, ...rest }: any) => {
  const [{ isDragging }, drag] = useDrag({
    item: { type, source, trainer },
    collect: monitor => ({
      isDragging: !!monitor.isDragging(),
    }),
  })

  return <Avatar {...rest} ref={drag} style={styles} />
}

export default DragableAvatar
