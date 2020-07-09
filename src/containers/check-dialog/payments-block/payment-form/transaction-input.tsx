import React from 'react'

import { useSelector, useActions } from 'store'

import TextField from '@material-ui/core/TextField'

export default function TransactionInput() {
  const transaction = useSelector(state => state.checkDialog.paymentForm?.transaction || '')
  const actions = useActions()
  const update = actions.checkDialog.updatePayment

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
