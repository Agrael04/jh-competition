import React from 'react'
import { useSelector, IStoreState, useActions } from 'store'

import MenuItem from '@material-ui/core/MenuItem'

import Select from 'containers/select'

import { paymentDestinations } from '../../data'

const selector = () => (state: IStoreState) => state.checkDialog.paymentForm?.destination

export default function CapacityInput() {
  const actions = useActions()
  const isDebt = useSelector(state => state.checkDialog.paymentForm?.isDebt)

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
      disabled={isDebt}
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
