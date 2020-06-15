import React from 'react'
import { IStoreState, useActions, useSelector } from 'store'

import MenuItem from '@material-ui/core/MenuItem'

import Select from 'containers/select'

import { products } from '../../data'

const selector = () => (state: IStoreState) => state.checkDialog.positionForm?.service

export default function ServiceSelect() {
  const actions = useActions()
  const type = useSelector(state => state.checkDialog.positionForm?.type)

  const handleChange = React.useCallback(
    (name, service) => {
      actions.checkDialog.updatePosition({ service })
    },
    [actions]
  )

  const product = products.find(p => p.id === type)

  return (
    <Select
      name='type'
      label='Услуги'
      onChange={handleChange}
      fieldSelector={selector}
      fullWidth={true}
      variant='outlined'
      disabled={!type}
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
