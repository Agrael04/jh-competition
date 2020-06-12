import React from 'react'
import { IStoreState, useActions } from 'store'

import MenuItem from '@material-ui/core/MenuItem'

import Select from 'containers/select'

import { products } from '../../data'

const selector = () => (state: IStoreState) => state.checkDialog.serviceForm?.type

export default function TypeSelect() {
  const actions = useActions()

  const handleChange = React.useCallback(
    (name, type) => {
      actions.checkDialog.updateService({
        type,
        service: undefined,
      })
    },
    [actions]
  )

  return (
    <Select
      name='type'
      label='Тип услуги'
      onChange={handleChange}
      fieldSelector={selector}
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
