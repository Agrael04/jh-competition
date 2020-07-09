import React from 'react'

import { useSelector, useActions } from 'store'

import ToggleButton from '@material-ui/lab/ToggleButton'
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup'

export default function AmountInput() {
  const type = useSelector(state => state.checkDialog.paymentForm?.type)

  const actions = useActions()
  const update = actions.checkDialog.updatePayment

  const handleTypeChange = React.useCallback(
    (e, type) => {
      update({ type, amount: null })
    },
    [update]
  )

  return (
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
  )
}
