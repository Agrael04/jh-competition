import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { IStoreState } from '../../../../store'

import Button from '@material-ui/core/Button'

import Grid from '@material-ui/core/Grid'

import TraineeRow from './trainee-row'

import actions from '../../../../store/actions'

export default function AddTrainingDialog() {
  const trainees = useSelector((state: IStoreState) => state.schedule.recordForm.trainees)
  const dispatch = useDispatch()

  const addTrainee = React.useCallback(
    () => dispatch(actions.schedule.addTrainee()),
    [dispatch]
  )

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
