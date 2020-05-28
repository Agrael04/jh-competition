import React from 'react'
import { IStoreState, useSelector, useActions } from 'store'

import TextField from 'containers/text-field'
const selector = () => (state: IStoreState) => state.checkDialog.passForm?.capacity

export default function CapacityInput() {
  const type = useSelector(state => state.checkDialog.passForm?.type)
  const actions = useActions()

  const handleChange = React.useCallback(
    (name, capacity) => {
      actions.checkDialog.updatePass({
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
      disabled={(type === 'universal' || type === 'no_trainer')}
      type='number'
    />
  )
}
