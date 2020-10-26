import React, { useEffect } from 'react'

import Paper from '@material-ui/core/Paper'
import Divider from '@material-ui/core/Divider'

import CheckDialog from 'containers/check-dialog'

import AddTrainerDialog from './add-trainer-dialog'
import TrainingDialog from './training-dialog'

import Header from './header'
import Table from './table'
import FiltersDialog from './filters-dialog'

import { useActions } from 'store'

import useStyles from './styles'

const SchedulePage = () => {
  const classes = useStyles()
  const actions = useActions()

  useEffect(
    () => {
      actions.schedule.page.checkActiveTime()
    },
    [actions]
  )

  return (
    <Paper className={classes.rootPaper}>
      <Header />
      <Divider />
      <Table />
      <TrainingDialog />
      <CheckDialog />
      <AddTrainerDialog />
      <FiltersDialog />
    </Paper>
  )
}

export default SchedulePage
