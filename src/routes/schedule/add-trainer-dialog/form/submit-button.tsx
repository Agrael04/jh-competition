import { useCallback } from 'react'
import { useDispatch } from 'store'
import { useFormContext } from 'react-hook-form'

import Button from '@material-ui/core/Button'

import { close } from 'store/ui/pages/schedule/add-trainer-dialog/actions'

import useCreateTrainerSchedules from '../../mutations/create-trainer-schedules'

import { IScheduleForm } from '../index'

export default function SubmitButton() {
  const createTrainerSchedules = useCreateTrainerSchedules()

  const { handleSubmit, errors } = useFormContext()
  const disabled = Object.keys(errors).length > 0
  const dispatch = useDispatch()

  const save = useCallback(
    async (data: IScheduleForm) => {
      const frames = data?.timeFrames?.map(tf =>
        Array
          .from(Array(tf.to).keys())
          .filter(t => t >= tf.from!)
          .map(t => ({
            time: t,
            gym: { link: tf.gym! },
            trainer: { link: data.trainer! },
            date: data.date?.toDate()!,
          }))
      )

      const schedules = frames?.reduce((res, f) => [...res, ...f], [])

      if (schedules && schedules.length > 0) {
        await createTrainerSchedules(schedules!)
      }

      dispatch(close())
    },
    [createTrainerSchedules]
  )

  return (
    <Button variant='contained' color='primary' onClick={handleSubmit(save)} disabled={disabled}>
      Добавить
    </Button>
  )
}
