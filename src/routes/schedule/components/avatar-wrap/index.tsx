import React from 'react'

import { useDrag } from 'react-dnd'

import AvatarWrap from './wrap'

const DragableAvatarWrap = ({ children, type, source, trainer, handleDoubleClick }: any) => {
  const [, drag] = useDrag({
    item: { type, source, trainer },
    collect: monitor => ({
      isDragging: !!monitor.isDragging(),
    }),
  })

  return (
    <AvatarWrap drag={drag} handleDoubleClick={handleDoubleClick}>
      {children}
    </AvatarWrap>
  )
}

export { AvatarWrap }
export { DragableAvatarWrap }

export default DragableAvatarWrap
