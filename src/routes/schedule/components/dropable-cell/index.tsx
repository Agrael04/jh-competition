import React from 'react'
import clsx from 'clsx'

import TableCell from '@material-ui/core/TableCell'

import { useDrop } from 'react-dnd'

import { DND_CREATE_TRAINING, DND_MOVE_TRAINING } from '../../constants'

import getColorPallete from 'utils/get-color-pallete'

import useStyles from './styles'

const DropableCell = ({ children, onDrop, canDrop, isOccupied, source, colorId, ...rest }: any) => {
  const classes = useStyles()

  const [{ item, over, dropable }, drop] = useDrop({
    accept: [DND_CREATE_TRAINING, DND_MOVE_TRAINING],
    drop: onDrop,
    collect: monitor => ({
      over: !!monitor.isOver(),
      dropable: !!monitor.isOver() && !!monitor.canDrop(),
      item: !!monitor.isOver() &&  monitor.getItem(),
    }),
    canDrop,
  })

  const color = React.useMemo(
    () => getColorPallete(colorId),
    [colorId]
  )

  const itemColor = React.useMemo(
    () => {
      return getColorPallete(item?.trainer)
    },
    [item]
  )

  const backgroundStyle = React.useMemo(
    () => ({ backgroundColor: color[400] }),
    [color]
  )

  const itemBackgroundStyle = React.useMemo(
    () => ({ backgroundColor: itemColor[100] }),
    [itemColor]
  )

  const darkItemBackgroundStyle = React.useMemo(
    () => ({ backgroundColor: itemColor[700] }),
    [itemColor]
  )

  return (
    <TableCell ref={drop} {...rest} className={classes.box} align='center' padding='none'>
      {
        isOccupied && <div className={classes.overlay} style={backgroundStyle} />
      }
      {
        over && dropable && !isOccupied && <div className={classes.overlay} style={itemBackgroundStyle}/>
      }
      {
        over && dropable && isOccupied && <div className={classes.overlay} style={darkItemBackgroundStyle} />
      }
      {
        over && !dropable &&
        !(
          item?.source?.time === source.time &&
          item?.source?.resource === source.resource
        ) && (
          <div className={clsx(classes.overlay, classes.redOverlay)} />
        )
      }
      {children}
    </TableCell>
  )
}

export default DropableCell
