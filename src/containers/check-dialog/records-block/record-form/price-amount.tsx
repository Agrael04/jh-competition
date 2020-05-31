import React from 'react'
import { useActions, IStoreState } from 'store'

import PriceType from './price-type'
import TextField from 'containers/text-field'

const selector = () => (state: IStoreState) => state.checkDialog.recordForm?.priceAmount

export default function RecordForm() {
  const actions = useActions()

  const handleChange = React.useCallback(
    (name, priceAmount) => {
      actions.checkDialog.updateRecord({
        priceAmount: +priceAmount,
      })
    },
    [actions]
  )

  return (
    <TextField
      name={'priceAmount'}
      onChange={handleChange}
      fieldSelector={selector}
      label='Цена'
      variant='outlined'
      fullWidth={true}
      InputProps={{
        endAdornment: (
          <PriceType />
        ),
      }}
    />
  )
}
