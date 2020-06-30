import React from 'react'

import TextField from '@material-ui/core/TextField'

import { useContext } from '../../context'

export default function CapacityInput() {
  const { transaction, update } = useContext(s => ({
    transaction: s.state.paymentForm?.transaction,
    update: s.actions.updatePayment,
  }))

  const handleChange = React.useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      update({ transaction: e.target.value })
    },
    [update]
  )

  return (
    <TextField
      name={'transaction'}
      value={transaction}
      onChange={handleChange}
      label={'Транзакция'}
      fullWidth={true}
      variant='outlined'
    />
  )
}
