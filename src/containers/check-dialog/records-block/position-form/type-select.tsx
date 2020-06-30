import React from 'react'

import Select from 'components/select'
import MenuItem from '@material-ui/core/MenuItem'

import { products } from '../../data'
import { useContext } from '../../context'

export default function TypeSelect() {
  const { type, update } = useContext(s => ({
    type: s.state.positionForm?.type,
    update: s.actions.updatePosition,
  }))

  const handleChange = React.useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      update({
        type: e.target.value,
        service: undefined,
      })
    },
    [update]
  )

  return (
    <Select
      name='type'
      label='Тип услуги'
      value={type}
      onChange={handleChange}
      fullWidth={true}
      variant='outlined'
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
