import { useDispatch, useSelector } from 'store'
import { createSelector } from 'reselect'

import Dialog from '@material-ui/core/Dialog'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import IconButton from '@material-ui/core/IconButton'
import Typography from '@material-ui/core/Typography'

import CloseIcon from '@material-ui/icons/Close'

import Grid from '@material-ui/core/Grid'
import Box from '@material-ui/core/Box'

import { close } from 'store/ui/pages/schedule/training-dialog/actions'

import { selectState } from 'store/ui/pages/schedule/training-dialog/selectors'

import TrainingForm from './training-form'
import RecordsStep from './records-step'

const selectProps = createSelector(
  selectState,
  (state) => ({
    opened: state.opened,
    mode: state.trainingForm.mode
  })
)

export default function TrainingDialog() {
  const dispatch = useDispatch()
  const { opened, mode } = useSelector(selectProps)

  const handleClose = () => dispatch(close())

  return (
    <Dialog
      open={opened}
      onClose={handleClose}
      maxWidth={mode === 'update' ? 'md' : 'xs'}
      fullWidth={true}
    >
      <AppBar position='relative'>
        <Toolbar>
          <IconButton edge='start' color='inherit' onClick={handleClose} aria-label='close'>
            <CloseIcon />
          </IconButton>
          <Typography variant='h6'>
            Тренировка
          </Typography>
        </Toolbar>
      </AppBar>
      <Box padding={3}>
        <Grid container={true} justify='space-around'>
          <Grid
            item={true}
            lg={mode === 'update' ? 6 : 12}
            container={true}
            spacing={3}
            justify='space-around'
          >
            <TrainingForm />
          </Grid>
          {
            mode === 'update' && (
              <Grid item={true} lg={6} container={true} spacing={3} justify='space-around'>
                <RecordsStep />
              </Grid>
            )
          }
        </Grid>
      </Box>
    </Dialog>
  )
}
