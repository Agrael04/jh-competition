import React from 'react'

import { useSelector, useActions } from 'store'

import Select from 'components/select'
import MenuItem from '@material-ui/core/MenuItem'

import { products } from '../../data'

export default function ServiceSelect() {
  const actions = useActions()
  const update = actions.checkDialog.updatePosition
  const { service, type } = useSelector(state => ({
    service: state.checkDialog.positionForm?.service,
    type: state.checkDialog.positionForm?.type,
  }))

  const handleChange = React.useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      update({ service: +e.target.value })
    },
    [update]
  )

  const product = products.find(p => p.id === type)

  return (
    <Select
      name='type'
      label='Услуги'
      value={service}
      onChange={handleChange}
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
