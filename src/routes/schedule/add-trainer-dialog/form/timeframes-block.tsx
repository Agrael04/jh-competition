import React from 'react'
import { useFieldArray } from 'react-hook-form'

import Button from '@material-ui/core/Button'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'

import TimeframeRow from './timeframe-row'

export default function TraineesBlock() {
  const { fields, append, remove } = useFieldArray({
    name: 'timeFrames',
  })

  const addTimeFrame = () => append({})

  const handleRemove = (index: number) => {
    if (fields.length > 1) {
      remove(index)
    }
  }

  return (
    <>
      <Grid item={true} lg={12}>
        <Typography>
          Время работы
        </Typography>
      </Grid>
      {
        fields.map((tf, index) => (
          <TimeframeRow index={index} key={tf.id} remove={handleRemove} />
        ))
      }
      {
        fields.length < 3 && (
          <Grid item={true} container={true} justify='flex-end'>
            <Button variant='outlined' color='primary' onClick={addTimeFrame}> Добавить время </Button>
          </Grid>
        )
      }
    </>
  )
}
