import React from 'react'
import { IStoreState, useSelector, useActions } from 'store'

import TextField from 'containers/text-field'

const selector = () => (state: IStoreState) => state.checkDialog.passForm?.activation

export default function ActivationInput() {
  const type = useSelector(state => state.checkDialog.passForm?.type)
  const actions = useActions()

  const handleChange = React.useCallback(
    (name, activation) => {
      actions.checkDialog.updatePass({
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
      disabled={(type === 'universal' || type === 'no_trainer')}
      type='number'
    />
  )
}
