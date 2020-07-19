import React from 'react'

import { useFormContext } from 'react-hook-form'
import { useSelector } from 'store'

import UserAutocomplete from 'containers/user-autocomplete'

import ContactAbornment from './contact-abornment'

import useGetTrainingQuery from '../../../queries/get-training'

interface IProps {
  value: { link: string } | null | undefined
  onChange: (value: any) => void
}

export default function ContactSuggester({ value, onChange }: IProps) {
  const { errors } = useFormContext()
  const error = errors.contact

  const { _id, recordId } = useSelector(state => ({
    _id: state.schedule.trainingDialog._id,
    recordId: state.schedule.trainingDialog.recordForm.record?._id,
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

  const initialFilter = record?.contact?.fullName
  const initialBalance = record?.contact?.balance || 0

  return (
    <UserAutocomplete
      value={value ? value.link : null}
      handleChange={handleChange}
      initialFilter={initialFilter}
      initialBalance={initialBalance}
      StartAdornment={ContactAbornment}
      label='Контактное лицо'
      error={!!error}
      helperText={error && 'Обязательное поле'}
    />
  )
}
