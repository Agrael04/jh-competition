import React from 'react'

import { useFormContext } from 'react-hook-form'

import TextField from '@material-ui/core/TextField'

interface IProps {
  value: string
  onChange: (value: any) => void
}

export default function TransactionInput({ onChange, value }: IProps) {
  const { errors } = useFormContext()
  const error = errors.transaction

  return (
    <TextField
      value={value || ''}
      onChange={onChange}
      name='transaction'
      label={'Транзакция'}
      fullWidth={true}
      variant='outlined'
      error={!!error}
      helperText={error && 'Обязательное поле'}
    />
  )
}
