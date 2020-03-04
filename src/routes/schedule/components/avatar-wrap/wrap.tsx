import React from 'react'

import Button from '@material-ui/core/Button'
import Box from '@material-ui/core/Box'

const DragableAvatar = ({ handleDoubleClick, children, drag }: any) => {
  return (
    <Box m={0.5}>
      <Button ref={drag} onDoubleClick={handleDoubleClick ? handleDoubleClick : undefined}>
        {children}
      </Button>
    </Box>
  )
}

export default DragableAvatar
