import React from 'react'

import { useFormContext } from 'react-hook-form'
import { useSelector } from 'store'

import UserAutocomplete from 'containers/user-autocomplete'

import useGetTrainingQuery from '../../../queries/get-training'

interface IProps {
  value: { link: string } | null | undefined
  onChange: (value: any) => void
}

export default function AttendantSuggester({ value, onChange }: IProps) {
  const { errors } = useFormContext()
  const error = errors.attendant

  const { _id, recordId } = useSelector(state => ({
    _id: state.schedule.trainingDialog._id,
    recordId: state.schedule.trainingDialog.recordForm.record!._id,
  }))
  const trainingQuery = useGetTrainingQuery(_id)

  const record = React.useMemo(
    () => {
      return trainingQuery.data?.trainingRecords.find(tr => tr._id === recordId)
    }, [trainingQuery, recordId]
  )

  const handleChange = (link: string | null) => {
    onChange(link ? { link } : undefined)
  }

  const initialFilter = record?.attendant?.fullName

  return (
    <UserAutocomplete
      value={value ? value.link : null}
      handleChange={handleChange}
      label='Физическое лицо'
      initialFilter={initialFilter}
      error={!!error}
      helperText={error && 'Обязательное поле'}
    />
  )
}
