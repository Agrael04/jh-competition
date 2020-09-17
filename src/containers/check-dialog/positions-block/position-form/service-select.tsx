import React from 'react'

import { useFormContext } from 'react-hook-form'

import Select from 'components/select'
import MenuItem from '@material-ui/core/MenuItem'

import { products } from '../../data'

interface IProps {
  value: number
  onChange: (value: any) => void
  error?: any
}

export default function ServiceSelect({ onChange, value, error }: IProps) {
  const { watch } = useFormContext()
  const type = watch('type')

  const handleChange = React.useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      onChange(e.target.value)
    },
    [onChange]
  )

  const product = products.find(p => p.id === type)

  console.log(product, value)

  return (
    <Select
      name='type'
      label='Услуги'
      value={value}
      onChange={handleChange}
      fullWidth={true}
      variant='outlined'
      disabled={!type}
      error={!!error}
      helperText={error && 'Обязательное поле'}
    >
      {
        (product?.options || []).map(service => (
          <MenuItem value={service.id} key={service.id}>
            {service.name}
          </MenuItem>
        ))
      }
    </Select>
  )
}
