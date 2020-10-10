import React, { useMemo } from 'react'
import uniqBy from 'lodash/uniqBy'

import { useFormContext } from 'react-hook-form'
import { useSelector } from 'store'

import MenuItem from '@material-ui/core/MenuItem'
import Select, { ISelectProps } from 'components/select'

import useGetSchedulesQuery from '../../../queries/get-schedules'

type IProps = ISelectProps & {
  onChange?: any
  value?: any
  error?: {
    message: string
  }
}

export default function TrainerSelect(props: IProps) {
  const { value, error, onChange } = props
  const { watch } = useFormContext()

  const startTime = watch('startTime')
  const endTime = watch('endTime')

  const { date, gym } = useSelector(state => ({
    date: state.schedule.trainingDialog.trainingForm.date,
    gym: state.schedule.trainingDialog.trainingForm.gym.link,
  }))
  const { data, loading } = useGetSchedulesQuery(date)

  const trainers = useMemo(
    () => {
      const schedules = data?.trainerSchedules
        .filter(ts => {
          if (gym && ts.gym._id !== gym) {
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

      const trainers = uniqBy(schedules?.map(sh => sh.trainer), '_id')

      return trainers
    },
    [data, startTime, endTime, gym]
  )

  const filteredTrainer = useMemo(
    () => {
      return trainers?.find(ft => ft._id === value?.link)
    },
    [trainers, value]
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
      if (!loading && value && !filteredTrainer) {
        onChange(undefined)
      }
    },
    [onChange, loading, value, filteredTrainer]
  )

  return (
    <Select
      value={filteredTrainer ? value.link : null}
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
