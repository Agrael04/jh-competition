import React from 'react'

import Select, { ISelectProps } from 'components/select'

type IProps = ISelectProps & {
  onChange?: any
  value?: any
  error?: {
    message: string
  }
}

export default function SelectWrap(props: IProps) {
  const { value, error, onChange } = props

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value)
  }

  return (
    <Select
      value={value || ''}
      onChange={handleChange}
      error={!!error}
      helperText={error?.message || props.helperText}
      {...props}
    />
  )
}
