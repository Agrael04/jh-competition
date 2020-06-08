import React from 'react'
import { IStoreState, useActions } from 'store'

import TextField from 'containers/text-field'

const selector = () => (state: IStoreState) => state.passForm.passForm?.price

interface IProps {
  disabled?: boolean
}

export default function PriceInput({ disabled }: IProps) {
  const actions = useActions()

  const handleChange = React.useCallback(
    (name, price) => {
      actions.passForm.update({
        price: +price,
      })
    },
    [actions]
  )

  return (
    <TextField
      name='price'
      onChange={handleChange}
      fieldSelector={selector}
      label='Цена'
      fullWidth={true}
      variant='outlined'
      disabled={disabled}
      type='number'
    />
  )
}
