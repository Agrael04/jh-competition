import React from 'react'
import { IStoreState, useSelector, useActions } from 'store'

import TextField from 'containers/text-field'

const selector = () => (state: IStoreState) => state.checkDialog.passForm?.duration

export default function DurationInput() {
  const type = useSelector(state => state.checkDialog.passForm?.type)
  const actions = useActions()

  const handleChange = React.useCallback(
    (name, duration) => {
      actions.checkDialog.updatePass({
        duration: +duration,
      })
    },
    [actions]
  )

  return (
    <TextField
      name='duration'
      onChange={handleChange}
      fieldSelector={selector}
      label='Срок действия'
      fullWidth={true}
      variant='outlined'
      disabled={(type === 'universal' || type === 'no_trainer')}
      type='number'
    />
  )
}
