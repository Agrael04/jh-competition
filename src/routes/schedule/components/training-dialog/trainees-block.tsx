import React from 'react'
import { useSelector, useActions } from '../../../../store'

import Button from '@material-ui/core/Button'

import Grid from '@material-ui/core/Grid'

import TraineeRow from './trainee-row'

export default function TraineesBlock() {
  const records = useSelector(state => state.schedule.recordForm.records)
  const actions = useActions()

  const addTrainee = actions.schedule.addTrainee

  return (
    <>
      {
        records.map((trainee, index) => (
          <TraineeRow index={index} key={index} />
        ))
      }
      {
        records.length < 3 && (
          <Grid item={true} container={true} justify='flex-end'>
            <Button variant='outlined' color='primary' onClick={addTrainee}> Add trainee </Button>
          </Grid>
        )
      }
    </>
  )
}
