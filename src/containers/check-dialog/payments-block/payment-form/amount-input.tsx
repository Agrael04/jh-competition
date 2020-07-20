import React from 'react'

import { useFormContext } from 'react-hook-form'

import TextField from '@material-ui/core/TextField'

interface IProps {
  value: number
  onChange: (value: number | null) => void
}

const AmountInput = ({ onChange, value }: IProps) => {
  const { errors } = useFormContext()
  const error = errors.amount

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
      name='amount'
      label='Сумма'
      variant='outlined'
      fullWidth={true}
      error={!!error}
      helperText={error && 'Обязательное поле'}
    />
  )
}

export default AmountInput
