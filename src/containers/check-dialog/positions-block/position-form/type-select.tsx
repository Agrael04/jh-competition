import React from 'react'

import { useFormContext } from 'react-hook-form'

import Select from 'components/select'
import MenuItem from '@material-ui/core/MenuItem'

import { products } from '../../data'

interface IProps {
  value: string | null
  error?: any
}

export default function TypeSelect({ value, error }: IProps) {
  const { reset } = useFormContext()

  const handleChange = React.useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const type = e.target.value
      reset({
        type,
        service: null,
        priceType: 'money',
        priceAmount: null,
      })
    },
    [reset]
  )

  return (
    <Select
      name='type'
      label='Тип услуги'
      value={value || ''}
      onChange={handleChange}
      fullWidth={true}
      variant='outlined'
      error={!!error}
      helperText={error && 'Обязательное поле'}
    >
      {
        products.map(product => (
          <MenuItem value={product.id} key={product.id}>
            {product.name}
          </MenuItem>
        ))
      }
    </Select>
  )
}
