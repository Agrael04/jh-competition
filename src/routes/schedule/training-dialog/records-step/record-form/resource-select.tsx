import React from 'react'

import { useSelector } from 'store'

import MenuItem from '@material-ui/core/MenuItem'

import Select from 'components/select'

import { getTimeLabel } from 'data/times'
import useGetTrainingQuery from '../../../queries/get-training'

interface IProps {
  value: { link: string } | null | undefined
  onChange: (value: any) => void
  error?: any
}

export default function ResourceSelect({ onChange, value, error }: IProps) {
  const { _id } = useSelector(state => ({
    _id: state.schedule.trainingDialog._id,
  }))
  const trainingQuery = useGetTrainingQuery(_id)

  const handleChange = React.useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      onChange({ link: e.target.value })
    },
    [onChange]
  )

  const getResouceLabel = React.useCallback(
    resource => {
      const name = resource?.resource?.name
      const st = getTimeLabel(resource.startTime)
      const et = getTimeLabel(resource.endTime)
      const recordsLength = trainingQuery.data?.trainingRecords.filter(r => r.resource?._id === resource._id).length

      return `${name}, ${st} - ${et}, ${recordsLength} записей`
    },
    [trainingQuery]
  )

  return (
    <Select
      value={value ? value.link : undefined}
      onChange={handleChange}
      name={'resource'}
      label='Ресурс'
      fullWidth={true}
      variant='outlined'
      error={!!error}
      helperText={error && 'Обязательное поле'}
    >
      {
        trainingQuery.data?.trainingResources.map(r => (
          <MenuItem value={r._id} key={r._id}>
            {getResouceLabel(r)}
          </MenuItem>
        ))
      }
    </Select>
  )
}
