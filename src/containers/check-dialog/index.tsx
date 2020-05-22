import React from 'react'
import { useSelector, useActions } from 'store'

import Dialog from '@material-ui/core/Dialog'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'

import Grid from '@material-ui/core/Grid'
import Box from '@material-ui/core/Box'

import Header from './header'
import PassForm from './pass-form'
import PaymentsBlock from './payments-block'
import RecordsBlock from './records-block'

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
          <Grid item={true} lg={4} container={true} direction='column' justify='space-between'>
            <Grid item={true}>
              <Box margin='auto' width='fit-content'>
                <Typography variant='h5' color='primary' align='center'>
                  Всего заказано
                </Typography>
                <Typography variant='h6' align='center'>
                  -1200 грн
                </Typography>
                <Typography variant='h6' align='center'>
                  -6 АБ
                </Typography>
              </Box>
            </Grid>
          </Grid>
          <Grid item={true} lg={4} container={true} direction='column' justify='space-between'>
            <Grid item={true}>
              <Box margin='auto' width='fit-content'>
                <Typography variant='h5' color='primary' align='center'>
                  Всего поступило
                </Typography>
                <Typography variant='h6' align='center'>
                  +1000 грн
                </Typography>
                <Typography variant='h6' align='center'>
                  +5 АБ
                </Typography>
              </Box>
            </Grid>
          </Grid>
          <Grid item={true} lg={4} container={true} direction='column' justify='space-between'>
            <Grid item={true}>
              <Box margin='auto' width='fit-content'>
                <Typography variant='h5' color='primary' align='center'>
                  Баланс
                </Typography>
                <Typography variant='h6' align='center'>
                  -200 грн
                </Typography>
                <Typography variant='h6' align='center'>
                  -1 АБ
                </Typography>
              </Box>
            </Grid>
            <Grid item={true} container={true}>
              <Box marginTop={3} width={1}>
                <Grid container={true} justify='space-around'>
                  <Button color='secondary' variant='contained'>
                    Закрыть в долг
                  </Button>
                  <Button color='primary' variant='contained' disabled={true}>
                    Закрыть чек
                  </Button>
                </Grid>
              </Box>
            </Grid>
          </Grid>
        </Grid>
      </Box>
    </Dialog>
  )
}
