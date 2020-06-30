import React from 'react'

import Select from 'components/select'
import MenuItem from '@material-ui/core/MenuItem'

import { products } from '../../data'
import { useContext } from '../../context'

export default function ServiceSelect() {
  const { service, type, update } = useContext(s => ({
    service: s.state.positionForm?.service,
    type: s.state.positionForm?.type,
    update: s.actions.updatePosition,
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
