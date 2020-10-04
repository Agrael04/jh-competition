import React from 'react'

import TextField, { TextFieldProps } from '@material-ui/core/TextField'

type IProps = TextFieldProps & {
  onChange?: any
  value?: any
  error?: {
    message: string
  }
}

export default function TextInput(props: IProps) {
  const { value, error, onChange } = props

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (props.type === 'number') {
      onChange(+e.target.value || '')
    } else {
      onChange(e.target.value)
    }
  }

  return (
    <TextField
      {...props}
      value={value || ''}
      onChange={handleChange}
      error={!!error}
      helperText={error?.message || props.helperText}
    />
  )
}