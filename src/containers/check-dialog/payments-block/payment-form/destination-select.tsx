import React from 'react'
import { IStoreState, useActions } from 'store'

import MenuItem from '@material-ui/core/MenuItem'

import Select from 'containers/select'

import { paymentDestinations } from '../../data'

const selector = () => (state: IStoreState) => state.checkDialog.paymentForm?.destination

export default function CapacityInput() {
  const actions = useActions()

  const handleChange = React.useCallback(
    (name, destination) => {
      actions.checkDialog.updatePayment({ destination })
    },
    [actions]
  )

  return (
    <Select
      name='destination'
      label='Кошелек'
      onChange={handleChange}
      fieldSelector={selector}
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
