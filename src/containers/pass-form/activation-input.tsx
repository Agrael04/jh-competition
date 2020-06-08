import React from 'react'
import { IStoreState, useActions } from 'store'

import TextField from 'containers/text-field'

const selector = () => (state: IStoreState) => state.passForm.passForm?.activation

interface IProps {
  disabled?: boolean
}

export default function ActivationInput({ disabled }: IProps) {
  const actions = useActions()

  const handleChange = React.useCallback(
    (name, activation) => {
      actions.passForm.update({
        activation: +activation,
      })
    },
    [actions]
  )

  return (
    <TextField
      name='duration'
      onChange={handleChange}
      fieldSelector={selector}
      label='Срок активации'
      fullWidth={true}
      variant='outlined'
      disabled={disabled}
      type='number'
    />
  )
}
