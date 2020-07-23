import React from 'react'

import { useFormContext } from 'react-hook-form'
import { useSelector } from 'store'

import MenuItem from '@material-ui/core/MenuItem'
import Select from 'components/select'

import useGetTrainingResourcesQuery from '../../../queries/get-training-resources'
import useGetSchedulesQuery, { isTrainerAvailable } from '../../../queries/get-schedules'

import times from 'data/times'

interface IProps {
  value: { link: string } | null | undefined
  onChange: (value: any) => void
  error?: any
}

export default function StartTimeSelect({ value, error }: IProps) {
  const { watch, reset } = useFormContext()

  const endTime = watch('endTime')
  const trainer = watch('trainer')?.link
  const resource = watch('resource')?.link

  const { date, gym, _id } = useSelector(state => ({
    date: state.schedule.trainingDialog.trainingForm.date,
    gym: state.schedule.trainingDialog.trainingForm.gym.link,
    _id: state.schedule.trainingDialog.resourceForm.resource?._id,
  }))
  const trainingResources = useGetTrainingResourcesQuery()
  const { data } = useGetSchedulesQuery(date)

  const filteredTimes = React.useMemo(
    () => {
      const prevResource = trainingResources.data?.trainingResources
        .find(tr => tr._id !== _id && tr.resource._id === resource && tr.endTime < endTime!)

      return times
        .filter(t => !endTime || t.id < endTime)
        .filter(t => !prevResource || t.id >= prevResource?.endTime)
    },
    [endTime, _id, resource, trainingResources]
  )

  const handleChange = React.useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const startTime = +e.target.value
      const isAvailable = trainer && isTrainerAvailable(data?.trainerSchedules || [], trainer, gym, startTime, endTime!)

      reset({
        startTime,
        endTime: endTime || (startTime < 27 ? startTime + 2 : endTime),
        trainer: isAvailable ? { link: trainer! } : undefined,
      })
    },
    [reset, endTime, data, trainer, gym]
  )

  return (
    <Select
      value={value}
      onChange={handleChange}
      label={'Время начала'}
      fullWidth={true}
      variant='outlined'
      error={!!error}
      helperText={error && 'Обязательное поле'}
    >
      {
        filteredTimes.map(time => (
          <MenuItem value={time.id} key={time.id}>
            {time.label}
          </MenuItem>
        ))
      }
    </Select>
  )
}
