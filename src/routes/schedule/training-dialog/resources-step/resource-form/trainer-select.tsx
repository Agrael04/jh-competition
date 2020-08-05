import React from 'react'

import { useFormContext } from 'react-hook-form'
import { useSelector } from 'store'

import MenuItem from '@material-ui/core/MenuItem'
import Select from 'components/select'

import useGetSchedulesQuery from '../../../queries/get-schedules'

interface IProps {
  value: { link: string } | null | undefined
  onChange: (value: any) => void
  error?: any
}

export default function TrainerSelect({ value, onChange, error }: IProps) {
  const { watch, reset } = useFormContext()

  const startTime = watch('startTime')
  const endTime = watch('endTime')
  const trainer = watch('trainer')?.link

  const { date, gym } = useSelector(state => ({
    date: state.schedule.trainingDialog.trainingForm.date,
    gym: state.schedule.trainingDialog.trainingForm.gym.link,
  }))
  const { data, loading } = useGetSchedulesQuery(date)

  const trainers = React.useMemo(
    () => {
      const schedules = data?.trainerSchedules
        .filter(ts => {
          if (ts.gym._id !== gym) {
            return false
          }

          if (startTime && ts.time < startTime) {
            return false
          }

          if (endTime && ts.time >= endTime) {
            return false
          }

          return true
        })
        .filter((ts, index, arr) => {
          if (!endTime || !startTime) {
            return true
          }

          return arr.filter(t => t.trainer._id === ts.trainer._id).length === (endTime - startTime)
        })

      const trainers = schedules?.map(sh => sh.trainer).filter((tr, index, arr) => {
        return arr.findIndex(item => item._id === tr._id) === index
      })

      return trainers
    },
    [data, startTime, endTime, gym]
  )

  const handleChange = React.useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      if (e.target.value) {
        onChange({ link: e.target.value })
      }
    },
    [onChange]
  )

  React.useEffect(
    () => {
      if (loading) {
        return
      }

      if (!trainer) {
        return
      }

      if (trainers?.find(ft => ft._id === trainer)) {
        return
      }

      reset({ trainer: undefined })
    },
    [reset, loading, trainers, handleChange, trainer]
  )

  return (
    <Select
      value={value ? value.link : null}
      onChange={handleChange}
      label={'Тренер'}
      fullWidth={true}
      variant='outlined'
      error={!!error}
      helperText={error && 'Обязательное поле'}
    >
      {
        trainers?.map(trainer => (
          <MenuItem value={trainer._id} key={trainer._id}>
            {trainer.firstName} {trainer.lastName}
          </MenuItem>
        ))
      }
    </Select>
  )
}
