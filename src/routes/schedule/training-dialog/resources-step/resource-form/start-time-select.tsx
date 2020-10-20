import React, { useEffect } from 'react'

import { useFormContext } from 'react-hook-form'
import { useSelector } from 'store'

import MenuItem from '@material-ui/core/MenuItem'
import Select, { ISelectProps } from 'components/select'

import useGetTrainingResourcesQuery from '../../../queries/get-training-resources'

import times, { MIN_TIME_ID, MAX_TIME_ID } from 'data/times'

type IProps = ISelectProps & {
  onChange?: any
  value?: any
  error?: {
    message: string
  }
}

export default function StartTimeSelect(props: IProps) {
  const { value, onChange, error } = props
  const { watch } = useFormContext()

  const endTime = watch('endTime')
  const resource = watch('resource')?.link

  const { _id } = useSelector(state => ({
    _id: state.schedule.trainingDialog.resourceForm._id,
  }))
  const trainingResources = useGetTrainingResourcesQuery()

  const filteredTimes = React.useMemo(
    () => {
      const prevResource = trainingResources.data?.trainingResources
        .find(tr => tr._id !== _id && tr.resource._id === resource && tr.endTime < endTime!)

      return times
        .filter(t => !endTime || t.id < endTime)
        .filter(t => !prevResource || t.id >= prevResource?.endTime)
        .filter(t => t.id < MAX_TIME_ID)
    },
    [endTime, _id, resource, trainingResources]
  )

  const handleChange = React.useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      onChange(+e.target.value)
    },
    [onChange]
  )

  useEffect(
    () => {
      if (endTime && !value) {
        onChange(Math.max(endTime - 2, MIN_TIME_ID))
      }
    }, [endTime, value, onChange]
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
