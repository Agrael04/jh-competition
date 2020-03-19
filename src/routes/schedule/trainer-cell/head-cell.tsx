import React from 'react'
import clsx from 'clsx'

import Typography from '@material-ui/core/Typography'
import TableCell from '@material-ui/core/TableCell'
import Fab from '@material-ui/core/Fab'

import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight'
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft'

import { useSelector, useActions } from 'store'

import useStyles from './styles'

const TrainerHeaderCell = () => {
  const classes = useStyles()
  const actions = useActions()
  const openedTrainers = useSelector(state => state.schedule.openedTrainers)

  const toggleTrainers = actions.schedule.toggleOpenedTrainers

  return (
    <TableCell className={clsx(classes.trainersTd, openedTrainers && classes.trainersColumnShift)}>
      <Typography>
        {'Тренера'}
      </Typography>

      <Fab onClick={toggleTrainers} className={classes.toggleOpenedTrainers} color='primary' size='small'>
        {
          openedTrainers
            ? <KeyboardArrowLeft />
            : <KeyboardArrowRight />
        }
      </Fab>
    </TableCell>
  )
}

export default TrainerHeaderCell
