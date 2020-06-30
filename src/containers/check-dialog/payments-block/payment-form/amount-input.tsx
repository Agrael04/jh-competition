import React from 'react'

import ToggleButton from '@material-ui/lab/ToggleButton'
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup'
import TextField from '@material-ui/core/TextField'

import { useContext } from '../../context'

export default function AmountInput() {
  const { type, amount, update } = useContext(s => ({
    type: s.state.paymentForm?.type,
    amount: s.state.paymentForm?.amount,
    update: s.actions.updatePayment,
  }))

  const handleChange = React.useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      update({ amount: +e.target.value })
    },
    [update]
  )

  const handleTypeChange = React.useCallback(
    (e, type) => {
      update({ type, amount: null })
    },
    [update]
  )

  return (
    <TextField
      name={'amount'}
      value={amount}
      onChange={handleChange}
      label='Сумма'
      variant='outlined'
      fullWidth={true}
      InputProps={{
        endAdornment: (
          <ToggleButtonGroup
            exclusive={true}
            value={type}
            onChange={handleTypeChange}
          >
            <ToggleButton value='money'>
              Грн
            </ToggleButton>
            <ToggleButton value='units'>
              АБ
            </ToggleButton>
          </ToggleButtonGroup>
        ),
      }}
    />
  )
}
