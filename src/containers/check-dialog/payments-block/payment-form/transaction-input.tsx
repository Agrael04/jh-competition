import React from 'react'

import TextField from '@material-ui/core/TextField'

interface IProps {
  value: string
  onChange: (value: any) => void
  error?: any
}

export default function TransactionInput({ onChange, value, error }: IProps) {
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
