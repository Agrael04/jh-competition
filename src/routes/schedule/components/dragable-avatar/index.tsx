import React from 'react'

import Avatar from '@material-ui/core/Avatar'
import Button from '@material-ui/core/Button'
import Tooltip from '@material-ui/core/Tooltip'
import Box from '@material-ui/core/Box'

import { useDrag } from 'react-dnd'

import MultilineTooltip from '../../../../components/multiline-tooltip'

const DragableAvatar = ({ type, source, trainer, tooltipRows, handleDoubleClick, Badge, ...rest }: any) => {
  const [{ isDragging }, drag] = useDrag({
    item: { type, source, trainer },
    collect: monitor => ({
      isDragging: !!monitor.isDragging(),
    }),
  })

  const Component = (props: any) => Badge ? (
    <Badge>
      <Avatar {...props} />
    </Badge>
  ) : (
    <Avatar {...props} />
  )

  return (
    <Tooltip title={<MultilineTooltip rows={tooltipRows} />}>
      <Box m={0.5}>
        <Button ref={drag} onDoubleClick={handleDoubleClick ? handleDoubleClick : undefined}>
          <Component {...rest} />
        </Button>
      </Box>
    </Tooltip>
  )
}

export default DragableAvatar
