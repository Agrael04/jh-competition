import React from 'react'
import { IStoreState, useActions } from 'store'

import TextField from 'containers/text-field'
const selector = () => (state: IStoreState) => state.passForm.passForm?.capacity

interface IProps {
  disabled?: boolean
}

export default function CapacityInput({ disabled }: IProps) {
  const actions = useActions()

  const handleChange = React.useCallback(
    (name, capacity) => {
      actions.passForm.update({
        capacity: +capacity,
      })
    },
    [actions]
  )

  return (
    <TextField
      name='capacity'
      onChange={handleChange}
      fieldSelector={selector}
      label='Кол-во АБ'
      fullWidth={true}
      variant='outlined'
      disabled={disabled}
      type='number'
    />
  )
}
