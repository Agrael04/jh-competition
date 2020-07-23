import React from 'react'

import Select from 'components/select'
import MenuItem from '@material-ui/core/MenuItem'

import { paymentDestinations } from '../../data'

interface IProps {
  value: string
  onChange: (value: any) => void
  error?: any
}

export default function CapacityInput({ onChange, value, error }: IProps) {
  return (
    <Select
      label='Кошелек'
      value={value}
      name='destination'
      onChange={onChange}
      fullWidth={true}
      variant='outlined'
      error={!!error}
      helperText={error && 'Обязательное поле'}
    >
      {
        paymentDestinations.map(destination => (
          <MenuItem value={destination.value} key={destination.value}>
            {destination.text}
          </MenuItem>
        ))
      }
    </Select>
  )
}
