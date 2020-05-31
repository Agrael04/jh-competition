import React from 'react'
import { useSelector, useActions } from 'store'

import Dialog from '@material-ui/core/Dialog'

import Grid from '@material-ui/core/Grid'
import Box from '@material-ui/core/Box'

import Header from './header'
import PassForm from './pass-form'
import PaymentsBlock from './payments-block'
import RecordsBlock from './records-block'
import TotalBlock from './total-block'

export default function TrainingDialog() {
  const { opened } = useSelector(state => ({
    opened: state.checkDialog.opened,
  }))

  const actions = useActions()

  const close = React.useCallback(
    () => actions.checkDialog.close(),
    [actions]
  )

  return (
    <Dialog open={opened} onClose={close} maxWidth='lg' fullWidth={true}>
      <Header />
      <Box padding={3}>
        <Grid container={true} spacing={3}>
          <Grid item={true} lg={4} container={true} justify='space-between' direction='column'>
            <RecordsBlock />
          </Grid>
          <Grid item={true} lg={4} container={true} justify='space-between' direction='column'>
            <PaymentsBlock />
          </Grid>
          <Grid item={true} lg={4}>
            <PassForm />
          </Grid>
          <Grid item={true} lg={12}>
            <Box border={1} borderColor='primary.main' width={1} />
          </Grid>
          <TotalBlock />
        </Grid>
      </Box>
    </Dialog>
  )
}
