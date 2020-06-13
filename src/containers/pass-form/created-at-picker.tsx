import React from 'react'

import { DatePicker } from '@material-ui/pickers'

import { useContext } from './context'

export default function CreatedAtPicker() {
  const value = useContext(s => s.state.passForm?.createdAt)
  const updateForm = useContext(s => s.updateForm)

  const handleChange = React.useCallback(
    (createdAt: any) => {
      updateForm({ createdAt })
    },
    [updateForm]
  )

  return (
    <DatePicker
      value={value ? new Date(value) : null}
      onChange={handleChange}
      name={'createdAt'}
      label='Дата создания'
      inputVariant='outlined'
      format='D MMMM'
      disabled={true}
      fullWidth={true}
    />
  )
}
