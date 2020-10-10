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

export default function EndTimeSelect(props: IProps) {
  const { value, onChange, error } = props
  const { watch } = useFormContext()

  const startTime = watch('startTime')
  const resource = watch('resource')?.link

  const { _id } = useSelector(state => ({
    _id: state.schedule.trainingDialog.resourceForm.resource?._id,
  }))
  const trainingResources = useGetTrainingResourcesQuery()

  const filteredTimes = React.useMemo(
    () => {
      const nextResource = trainingResources.data?.trainingResources
        .find(tr => tr._id !== _id && tr.resource._id === resource && tr.startTime > startTime!)

      return times
        .filter(t => !startTime || t.id > startTime)
        .filter(t => !nextResource || t.id <= nextResource?.startTime)
        .filter(t => t.id > MIN_TIME_ID)
    },
    [startTime, _id, resource, trainingResources]
  )

  const handleChange = React.useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      onChange(+e.target.value)
    },
    [onChange]
  )

  useEffect(
    () => {
      if (startTime && !value) {
        onChange(Math.min(startTime + 2, MAX_TIME_ID))
      }
    }, [startTime, value, onChange]
  )

  return (
    <Select
      value={value}
      onChange={handleChange}
      label={'Время конца'}
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
