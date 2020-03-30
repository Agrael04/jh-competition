import React from 'react'
import { useSelector, useActions } from 'store'

import Button from '@material-ui/core/Button'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'

import TraineeRow from './timeframe-row'

export default function TraineesBlock() {
  const timeFrames = useSelector(state => state.schedule.addTrainerDialog.timeFrames)
  const actions = useActions()

  const addTimeFrame = actions.schedule.addTrainerDialog.addTimeFrame

  return (
    <>
      <Grid item={true} lg={12}>
        <Typography>
          Время работы
        </Typography>
      </Grid>
      {
        timeFrames.map((tf, index) => (
          <TraineeRow index={index} key={index} />
        ))
      }
      {
        timeFrames.length < 3 && (
          <Grid item={true} container={true} justify='flex-end'>
            <Button variant='outlined' color='primary' onClick={addTimeFrame}> Добавить время </Button>
          </Grid>
        )
      }
    </>
  )
}
