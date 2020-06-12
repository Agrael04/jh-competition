import React from 'react'
import { useSelector, useActions } from 'store'

import ToggleButton from '@material-ui/lab/ToggleButton'
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup'

export default function RecordForm() {
  const actions = useActions()
  const value = useSelector(state => state.checkDialog.serviceForm?.priceType)

  const handleChange = (event: React.MouseEvent<HTMLElement>, newValue: 'units' | 'money') => {
    actions.checkDialog.updateService({
      priceType: newValue,
      priceAmount: undefined,
    })
  }

  return (
    <ToggleButtonGroup
      exclusive={true}
      value={value}
      onChange={handleChange}
    >
      <ToggleButton value='money' disabled={true}>
        Грн
      </ToggleButton>
      <ToggleButton value='units' disabled={true}>
        АБ
      </ToggleButton>
    </ToggleButtonGroup>
  )
}
