import React from 'react'
import { useSelector, useActions } from 'store'

import ToggleButton from '@material-ui/lab/ToggleButton'
import Box from '@material-ui/core/Box'

export default function SaveButton() {
  const actions = useActions()
  const value = useSelector(state => !!state.checkDialog.paymentForm?.isDebt)

  const handleChange = React.useCallback(
    () => {
      actions.checkDialog.updatePayment({
        isDebt: !value,
        pass: undefined,
        destination: undefined,
        transaction: undefined,
      })
    },
    [actions, value]
  )

  return (
    <Box marginY='auto'>
      <ToggleButton value={value} selected={value} onChange={handleChange} color='secondary'>
        Долг
      </ToggleButton>
    </Box>
  )
}
