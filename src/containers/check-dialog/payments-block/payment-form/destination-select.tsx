import React from 'react'

import { useSelector, useActions } from 'store'

import Select from 'components/select'
import MenuItem from '@material-ui/core/MenuItem'

import { paymentDestinations } from '../../data'

export default function CapacityInput() {
  const destination = useSelector(state => state.checkDialog.paymentForm?.destination || '')
  const actions = useActions()
  const update = actions.checkDialog.updatePayment

  const handleChange = React.useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      update({ destination: e.target.value })
    },
    [update]
  )

  return (
    <Select
      name='destination'
      label='Кошелек'
      value={destination}
      onChange={handleChange}
      fullWidth={true}
      variant='outlined'
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
