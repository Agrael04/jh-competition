import React from 'react'
import clsx from 'clsx'

import TableCell from '@material-ui/core/TableCell'

import { useDrop } from 'react-dnd'

import { DND_CREATE_TRAINING, DND_MOVE_TRAINING } from '../../constants'

import useStyles from './styles'

const DropableCell = ({ children, onDrop, canDrop, isOccupied, ...rest }: any) => {
  const classes = useStyles()
  const [{ over, dropable }, drop] = useDrop({
    accept: [DND_CREATE_TRAINING, DND_MOVE_TRAINING],
    drop: ({ type, source, trainer }: any) => {
      onDrop(type, source, trainer)
    },
    collect: monitor => ({
      over: !!monitor.isOver(),
      dropable: !!monitor.canDrop(),
    }),
    canDrop: ({ type, source, trainer }) => {
      return canDrop(type, source, trainer)
    },
  })

  return (
    <TableCell ref={drop} {...rest} className={classes.box} align='center'>
      {
        over && dropable && !isOccupied && <div className={clsx(classes.overlay, classes.greenOverlay)} />
      }
      {
        over && dropable && isOccupied && <div className={clsx(classes.overlay, classes.amberOverlay)} />
      }
      {
        over && !dropable && <div className={clsx(classes.overlay, classes.redOverlay)} />
      }
      {children}
    </TableCell>
  )
}

export default DropableCell
