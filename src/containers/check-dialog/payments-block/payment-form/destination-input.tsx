import React from 'react'
import { useSelector, IStoreState, useActions } from 'store'

import TextField from 'containers/text-field'

const selector = () => (state: IStoreState) => state.checkDialog.paymentForm?.destination

export default function CapacityInput() {
  const actions = useActions()
  const isDebt = useSelector(state => state.checkDialog.paymentForm?.isDebt)

  const handleChange = React.useCallback(
    (name, destination) => {
      actions.checkDialog.updatePayment({
        destination,
      })
    },
    [actions]
  )

  return (
    <TextField
      name={'destination'}
      onChange={handleChange}
      fieldSelector={selector}
      label={'Кошелек'}
      fullWidth={true}
      variant='outlined'
      disabled={isDebt}
    />
  )
}
