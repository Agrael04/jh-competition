import React from 'react'
import { useSelector, IStoreState, useActions } from 'store'

import TextField from 'containers/text-field'

const selector = () => (state: IStoreState) => state.checkDialog.paymentForm?.transaction

export default function CapacityInput() {
  const actions = useActions()
  const isDebt = useSelector(state => state.checkDialog.paymentForm?.isDebt)

  const handleChange = React.useCallback(
    (name, transaction) => {
      actions.checkDialog.updatePayment({
        transaction,
      })
    },
    [actions]
  )

  return (
    <TextField
      name={'transaction'}
      onChange={handleChange}
      fieldSelector={selector}
      label={'Транзакция'}
      fullWidth={true}
      variant='outlined'
      disabled={isDebt}
    />
  )
}
