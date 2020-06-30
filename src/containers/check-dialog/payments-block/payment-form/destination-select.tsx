import React from 'react'

import Select from 'components/select'
import MenuItem from '@material-ui/core/MenuItem'

import { useContext } from '../../context'

import { paymentDestinations } from '../../data'

export default function CapacityInput() {
  const { destination, update } = useContext(s => ({
    destination: s.state.paymentForm?.destination,
    update: s.actions.updatePayment,
  }))

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
