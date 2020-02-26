import React from 'react'
import clsx from 'clsx'

import TableCell from '@material-ui/core/TableCell'

import { useDrop } from 'react-dnd'

import { DND_CREATE_TRAINING, DND_MOVE_TRAINING } from '../../constants'

import useStyles from './styles'

import purple from '@material-ui/core/colors/purple'
import indigo from '@material-ui/core/colors/indigo'
import teal from '@material-ui/core/colors/teal'
import lime from '@material-ui/core/colors/lime'
import lightBlue from '@material-ui/core/colors/lightBlue'
import brown from '@material-ui/core/colors/brown'
import blue from '@material-ui/core/colors/blue'
import deepPurple from '@material-ui/core/colors/deepPurple'
import cyan from '@material-ui/core/colors/cyan'
import green from '@material-ui/core/colors/green'
import blueGrey from '@material-ui/core/colors/blueGrey'

const colors = [
  purple, indigo, teal, lime, lightBlue, brown, blue, green, deepPurple, cyan,
]

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
    () => colors[colorId] || blueGrey,
    [colorId]
  )

  const itemColor = React.useMemo(
    () => {
      return colors[item?.trainer] || blueGrey
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
