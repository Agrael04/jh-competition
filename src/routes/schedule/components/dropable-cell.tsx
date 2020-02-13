import React from 'react'

import TableCell from '@material-ui/core/TableCell'

import { useDrop } from 'react-dnd'

import { DND_CREATE_TRAINING, DND_MOVE_TRAINING } from '../constants'

const DropableCell = ({ children, onDrop, canDrop, ...rest }: any) => {
  const [{ isOver }, drop] = useDrop({
    accept: [DND_CREATE_TRAINING, DND_MOVE_TRAINING],
    drop: ({ type, source, trainer }: any) => {
      onDrop(type, source, trainer)
    },
    collect: monitor => ({
      isOver: !!monitor.isOver(),
    }),
    canDrop: ({ type, source, trainer }) => {
      return canDrop(type, source, trainer)
    },
  })

  return (
    <TableCell ref={drop} {...rest}>
      {children}
    </TableCell>
  )
}

export default DropableCell
