import React from 'react'
import clsx from 'clsx'

import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid'
import Box from '@material-ui/core/Box'
import IconButton from '@material-ui/core/IconButton'

import AddCircle from '@material-ui/icons/AddCircle'

import TableCell from '../table-cell'

import { useSelector, useActions } from 'store'

import useStyles from './styles'

const TrainerHeaderCell = () => {
  const classes = useStyles()
  const actions = useActions()
  const openedTrainers = useSelector(state => state.schedule.page.openedTrainers)

  const openTrainerScheduleDialog = () => actions.schedule.page.openAddTrainerDialog()

  return (
    <TableCell className={clsx(classes.trainersTd, openedTrainers && classes.trainersColumnShift)} secondaryRow={true}>
      <Grid container={true} justify='space-between'>
        <Box marginY='auto'>
          <Typography>
            {'Тренера'}
          </Typography>
        </Box>

        <Grid item={true} lg={6} container={true} justify='flex-end'>
          <IconButton size='small' color='primary' onClick={openTrainerScheduleDialog}>
            <AddCircle />
          </IconButton>
        </Grid>
      </Grid>
    </TableCell>
  )
}

export default TrainerHeaderCell
