import React from 'react'

import Avatar from '@material-ui/core/Avatar'
import Button from '@material-ui/core/Button'
import Box from '@material-ui/core/Box'

import Tooltip from '../../../../components/multiline-tooltip'

const DragableAvatar = ({ tooltipRows, handleDoubleClick, children, ...rest }: any) => {
  return (
    <Tooltip rows={tooltipRows}>
      <Box m={0.5}>
        <Button onDoubleClick={handleDoubleClick ? handleDoubleClick : undefined}>
          <Avatar {...rest}>
            {children}
          </Avatar>
        </Button>
      </Box>
    </Tooltip>
  )
}

export default DragableAvatar
