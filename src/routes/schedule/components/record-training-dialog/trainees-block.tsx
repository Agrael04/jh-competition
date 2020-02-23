import React from 'react'
import { useSelector, useActions } from '../../../../store'

import Button from '@material-ui/core/Button'

import Grid from '@material-ui/core/Grid'

import TraineeRow from './trainee-row'

export default function AddTrainingDialog() {
  const trainees = useSelector(state => state.schedule.recordForm.trainees)
  const actions = useActions()

  const addTrainee = actions.schedule.addTrainee

  return (
    <>
      {
        trainees.map((trainee, index) => (
          <TraineeRow index={index} key={index} />
        ))
      }
      {
        trainees.length < 3 && (
          <Grid item={true} container={true} justify='flex-end'>
            <Button variant='outlined' color='primary' onClick={addTrainee}> Add trainee </Button>
          </Grid>
        )
      }
    </>
  )
}
