import React from 'react'

import TextField from '@material-ui/core/TextField'

import { useContext } from './context'

interface IProps {
  name: 'activation' | 'duration' | 'capacity' | 'price'
  label: string
  disabled?: boolean
}

export default function ActivationInput({ disabled, name, label }: IProps) {
  const value = useContext(s => s.state.passForm && s.state.passForm[name])
  const updateForm = useContext(s => s.updateForm)

  const handleChange = React.useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      updateForm({
        [name]: +e.target.value,
      })
    }, [updateForm, name]
  )

  const v = (value === null || value === undefined) ? '' : value

  return (
    <TextField
      name={name}
      onChange={handleChange}
      value={v}
      label={label}
      fullWidth={true}
      variant='outlined'
      disabled={disabled}
      type='number'
    />
  )
}
