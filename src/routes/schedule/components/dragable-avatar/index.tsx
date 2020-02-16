import React from 'react'

import Avatar from '@material-ui/core/Avatar'
import Button from '@material-ui/core/Button'
import Tooltip from '@material-ui/core/Tooltip'

import { useDrag } from 'react-dnd'

import MultilineTooltip from '../../../../components/multiline-tooltip'

const DragableAvatar = ({ type, source, trainer, tooltipRows, ...rest }: any) => {
  const [{ isDragging }, drag] = useDrag({
    item: { type, source, trainer },
    collect: monitor => ({
      isDragging: !!monitor.isDragging(),
    }),
  })

  return (
    <Tooltip title={<MultilineTooltip rows={tooltipRows} />}>
      <Button ref={drag}>
        <Avatar {...rest} />
      </Button>
    </Tooltip>
  )
}

export default DragableAvatar
