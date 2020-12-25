import { useDispatch, useSelector } from 'store'
import { createSelector } from 'reselect'

import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import Button from '@material-ui/core/Button'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import IconButton from '@material-ui/core/IconButton'
import Typography from '@material-ui/core/Typography'
import Stepper from '@material-ui/core/Stepper'
import Step from '@material-ui/core/Step'
import StepButton from '@material-ui/core/StepButton'
import Divider from '@material-ui/core/Divider'

import CloseIcon from '@material-ui/icons/Close'

import Grid from '@material-ui/core/Grid'
import Box from '@material-ui/core/Box'

import { close, setStep } from 'store/ui/pages/schedule/training-dialog/actions'

import { selectState, selectTrainingId } from 'store/ui/pages/schedule/training-dialog/selectors'

import TrainingStep from './training-step'
import ResourcesStep from './resources-step'
import RecordsStep from './records-step'

import useGetTrainingQuery from '../queries/get-training'

const steps = ['Тренировка', 'Ресурсы', 'Записи']

const selectProps = createSelector(
  selectState,
  selectTrainingId,
  (state, _id) => ({
    opened: state.opened,
    step: state.step,
    _id,
  })
)

export default function TrainingDialog() {
  const dispatch = useDispatch()
  const { opened, _id, step } = useSelector(selectProps)

  const trainingQuery = useGetTrainingQuery(_id)

  const handleClose = () => dispatch(close())

  const activateStep = (index: number) => () => dispatch(setStep(index))

  const isResourceStepAvailable = !!trainingQuery.data?.training

  const isRecordStepAvailable = (trainingQuery.data?.trainingResources || []).length > 0

  return (
    <Dialog open={opened} onClose={handleClose} maxWidth='lg' fullWidth={true}>
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
      <Stepper activeStep={step}>
        {steps.map((label, index) => (
          <Step key={label}>
            <StepButton
              onClick={activateStep(index)}
              disabled={
                (index === 1 && !isResourceStepAvailable) ||
                (index === 2 && !isRecordStepAvailable)
              }
            >
              {label}
            </StepButton>
          </Step>
        ))}
      </Stepper>
      <Divider />
      <Box padding={3}>
        <Grid container={true} direction='column' justify='space-around'>
          <Grid item={true} container={true} spacing={3} justify='space-around'>

            {
              step === 0 && (
                <TrainingStep />
              )
            }
            {
              step === 1 && (
                <ResourcesStep />
              )
            }
            {
              step === 2 && (
                <RecordsStep />
              )
            }
          </Grid>
        </Grid>
      </Box>
      <Divider />
      <DialogActions>
        {
          step > 0 && (
            <Button color='primary' onClick={activateStep(step - 1)}>
              Назад
            </Button>
          )
        }
        <Button
          color='primary'
          onClick={activateStep(step + 1)}
          disabled={(
            (step === 0 && !isResourceStepAvailable) ||
            (step === 1 && !isRecordStepAvailable)
          )}
        >
          Далее
        </Button>
      </DialogActions>
    </Dialog>
  )
}
