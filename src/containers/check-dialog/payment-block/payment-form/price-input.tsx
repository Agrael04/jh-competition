import React from 'react'
import { IStoreState, useSelector, useActions } from 'store'

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

  return (
    <TextField
      name={'price'}
      onChange={handleChange}
      fieldSelector={selector}
      label='Сумма'
      variant='outlined'
      fullWidth={true}
      InputProps={{
        endAdornment: (
          <ToggleButtonGroup
            exclusive={true}
            value={type === 'pass' ? 'units' : type === 'money' ? 'money' : null}
          >
            <ToggleButton value='money' disabled={true}>
              Грн
            </ToggleButton>
            <ToggleButton value='units' disabled={true}>
              АБ
            </ToggleButton>
          </ToggleButtonGroup>
        ),
      }}
    />
  )
}
