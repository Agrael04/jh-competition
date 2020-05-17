import React from 'react'
import { IStoreState, useSelector, useActions } from 'store'

import TextField from 'containers/text-field'

interface IProps {
  name: string
  label: string
}

const selector = () => (state: IStoreState) => state.schedule.checkDialog.passForm?.capacity

export default function ResourceSelect({ name, label }: IProps) {
  const type = useSelector(state => state.schedule.checkDialog.passForm?.type)
  const actions = useActions()

  const handleChange = React.useCallback(
    (name, capacity) => {
      actions.schedule.checkDialog.updatePass({
        capacity: +capacity,
      })
    },
    [actions]
  )

  return (
    <TextField
      name={name}
      onChange={handleChange}
      fieldSelector={selector}
      label={label}
      fullWidth={true}
      variant='outlined'
      disabled={(type === 'universal' || type === 'no_trainer')}
      type='number'
    />
  )
}
