import React from 'react'

import Button from '@material-ui/core/Button'

const DragableAvatar = ({ handleDoubleClick, children, drag }: any) => {
  return (
    <Button ref={drag} onDoubleClick={handleDoubleClick ? handleDoubleClick : undefined}>
      {children}
    </Button>
  )
}

export default DragableAvatar
