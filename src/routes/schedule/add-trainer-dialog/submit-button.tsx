import React from 'react'
import { useSelector, useActions } from 'store'

import Button from '@material-ui/core/Button'

import useCreateTrainerSchedules from '../mutations/create-trainer-schedules'

export default function SubmitButton() {
  const createTrainerSchedules = useCreateTrainerSchedules()

  const actions = useActions()
  const { form, timeFrames } = useSelector(state => ({
    form: state.schedule.addTrainerDialog.form,
    timeFrames: state.schedule.addTrainerDialog.timeFrames,
  }))

  const save = React.useCallback(
    async () => {
      if (!form.trainer) {
        return
      }

      const frames = timeFrames.map(tf =>
        Array
          .from(Array(tf.to).keys())
          .filter(t => t >= tf.from!)
          .map(t => ({
            time: t,
            gym: tf.gym,
            trainer: form.trainer!,
            date: form.date,
          }))
      )

      const schedules = frames.reduce((res, f) => [...res, ...f], [])

      if (schedules.length > 0) {
        await createTrainerSchedules(schedules)
      }

      actions.schedule.addTrainerDialog.close()
    },
    [actions, form, timeFrames, createTrainerSchedules]
  )

  return (
    <Button variant='contained' color='primary' onClick={save}> Добавить </Button>
  )
}
