import React from 'react'

import TextField from '@material-ui/core/TextField'

interface IProps {
  value: number
  onChange: (value: number | null) => void
  error?: any
}

export default function PriceAmountInput({ onChange, value, error }: IProps) {
  const handleChange = React.useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      onChange(e.target.value === '' ? null : +e.target.value)
    },
    [onChange]
  )

  return (
    <TextField
      value={value || ''}
      onChange={handleChange}
      name={'priceAmount'}
      label='Цена'
      variant='outlined'
      fullWidth={true}
      error={!!error}
      helperText={error && 'Обязательное поле'}
    />
  )
}
