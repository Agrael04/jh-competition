import React from 'react'
import { IStoreState, useActions, useSelector } from 'store'

import ToggleButton from '@material-ui/lab/ToggleButton'
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup'

import TextField from 'containers/text-field'

const selector = () => (state: IStoreState) => state.checkDialog.paymentForm?.amount

export default function AmountInput() {
  const type = useSelector(state => state.checkDialog.paymentForm?.type)
  const actions = useActions()

  const handleChange = React.useCallback(
    (name, amount) => {
      actions.checkDialog.updatePayment({
        amount: +amount,
      })
    },
    [actions]
  )

  const handleTypeChange = React.useCallback(
    (e, type) => {
      actions.checkDialog.updatePayment({
        type,
        amount: null,
      })
    },
    [actions]
  )

  return (
    <TextField
      name={'amount'}
      onChange={handleChange}
      fieldSelector={selector}
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
