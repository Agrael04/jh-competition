import React from 'react'

import { useSelector, useActions } from 'store'

import Select from 'components/select'
import MenuItem from '@material-ui/core/MenuItem'

import { products } from '../../data'

export default function TypeSelect() {
  const actions = useActions()
  const update = actions.checkDialog.updatePosition
  const { type } = useSelector(state => ({
    type: state.checkDialog.positionForm?.type,
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
