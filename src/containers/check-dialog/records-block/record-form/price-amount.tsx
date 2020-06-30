import React from 'react'

import ToggleButton from '@material-ui/lab/ToggleButton'
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup'
import TextField from '@material-ui/core/TextField'

import { useContext } from '../../context'

export default function RecordForm() {
  const { priceAmount, priceType, update } = useContext(s => ({
    priceAmount: s.state.recordForm?.priceAmount,
    priceType: s.state.recordForm?.priceType,
    update: s.actions.updateRecord,
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
