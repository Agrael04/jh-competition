import React from 'react'

import { useFormContext } from 'react-hook-form'

import MenuItem from '@material-ui/core/MenuItem'

import Select from 'components/select'

interface IProps {
  value: string | null | undefined
  onChange: (value: any) => void
}

const statuses = ['ONLINE_BOOKED', 'SCHEDULED', 'BOOKED', 'CONFIRMED', 'CANCELED', 'LATE_CANCELED', 'STARTED', 'FINISHED', 'CLOSED', 'CLOSED_DEBT']

export default function StatusSelect({ onChange, value }: IProps) {
  const { errors } = useFormContext()
  const error = errors.status

  const handleChange = React.useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      onChange(e.target.value)
    },
    [onChange]
  )

  return (
    <Select
      value={value}
      onChange={handleChange}
      name={'status'}
      label='Статус'
      fullWidth={true}
      variant='outlined'
      error={!!error}
      helperText={error && 'Обязательное поле'}
    >
      {
        statuses.map(type => (
          <MenuItem value={type} key={type}>
            {type}
          </MenuItem>
        ))
      }
    </Select>
  )
}
