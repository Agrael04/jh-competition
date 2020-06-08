import React from 'react'
import { IStoreState, useActions } from 'store'

import TextField from 'containers/text-field'

const selector = () => (state: IStoreState) => state.passForm.passForm?.duration

interface IProps {
  disabled?: boolean
}

export default function DurationInput({ disabled }: IProps) {
  const actions = useActions()

  const handleChange = React.useCallback(
    (name, duration) => {
      actions.passForm.update({
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
      disabled={disabled}
      type='number'
    />
  )
}
