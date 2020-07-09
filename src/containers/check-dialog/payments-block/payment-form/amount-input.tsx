import React from 'react'

import { useSelector, useActions } from 'store'

import TextField from '@material-ui/core/TextField'

import TypeToggle from './type-toggle'

export default function AmountInput() {
  console.time('asd')
  const [v, setV] = React.useState<number | null>(null)
  const amount = useSelector(state => state.checkDialog.paymentForm?.amount)

  const actions = useActions()
  const update = actions.checkDialog.updatePayment

  const handleChange = React.useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setV(+e.target.value)
      // update({ amount: +e.target.value })
    },
    [update]
  )

  console.timeEnd('asd')

  return (
    <TextField
      name={'amount'}
      value={v || ''}
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
