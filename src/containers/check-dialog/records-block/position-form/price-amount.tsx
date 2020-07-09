import React from 'react'

import { useSelector, useActions } from 'store'

import ToggleButton from '@material-ui/lab/ToggleButton'
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup'
import TextField from '@material-ui/core/TextField'

export default function RecordForm() {
  const actions = useActions()
  const update = actions.checkDialog.updatePosition
  const { priceAmount, priceType } = useSelector(state => ({
    priceAmount: state.checkDialog.positionForm?.priceAmount,
    priceType: state.checkDialog.positionForm?.priceType,
  }))

  const handleChange = React.useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      update({ priceAmount: +e.target.value })
    },
    [update]
  )

  const handleTypeChange = React.useCallback(
    (e, priceType) => {
      update({ priceType, priceAmount: null })
    },
    [update]
  )

  return (
    <TextField
      name={'priceAmount'}
      value={priceAmount}
      onChange={handleChange}
      label='Цена'
      variant='outlined'
      fullWidth={true}
      InputProps={{
        endAdornment: (
          <ToggleButtonGroup
            exclusive={true}
            value={priceType}
            onChange={handleTypeChange}
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
