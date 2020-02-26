import React from 'react'

import Avatar from '@material-ui/core/Avatar'
import Button from '@material-ui/core/Button'
import Box from '@material-ui/core/Box'
import Badge from '@material-ui/core/Badge'

import { useDrag } from 'react-dnd'

import FaceIcon from '@material-ui/icons/Face'

import Tooltip from '../../../../components/multiline-tooltip'

const DragableAvatar = ({ type, source, trainer, tooltipRows, handleDoubleClick, badgeContent, ...rest }: any) => {
  const [{ isDragging }, drag] = useDrag({
    item: { type, source, trainer },
    collect: monitor => ({
      isDragging: !!monitor.isDragging(),
    }),
  })

  return (
    <Tooltip rows={tooltipRows}>
      <Box m={0.5}>
        <Button ref={drag} onDoubleClick={handleDoubleClick ? handleDoubleClick : undefined}>
          <Badge
            overlap='circle'
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'right',
            }}
            badgeContent={badgeContent}
            color={'error'}
          >
            <Avatar {...rest} >
              <FaceIcon />
            </Avatar>
          </Badge>
        </Button>
      </Box>
    </Tooltip>
  )
}

export default DragableAvatar
