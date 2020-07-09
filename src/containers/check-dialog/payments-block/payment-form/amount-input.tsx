import React from 'react'

import { useSelector, useActions } from 'store'

import TextField from '@material-ui/core/TextField'

import TypeToggle from './type-toggle'

export default function AmountInput() {
  const amount = useSelector(state => state.checkDialog.paymentForm?.amount)

  const actions = useActions()
  const update = actions.checkDialog.updatePayment

  const handleChange = React.useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      update({ amount: +e.target.value })
    },
    [update]
  )

  return (
    <TextField
      name={'amount'}
      value={amount || ''}
      onChange={handleChange}
      label='Сумма'
      variant='outlined'
      fullWidth={true}
      InputProps={{
        endAdornment: (
          <TypeToggle />
        ),
      }}
    />
  )
}
