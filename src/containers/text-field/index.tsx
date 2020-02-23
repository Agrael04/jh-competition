import React from 'react'
import { useSelector } from 'react-redux'
import { IStoreState } from '../../store'

import TextField from '@material-ui/core/TextField'

interface IProps {
  name: any
  onChange: (name: any, value: any) => void
  fieldSelector: (name: any) => (state: IStoreState) => any
  [x: string]: any
}

export default function TextFieldContainer({ name, onChange, fieldSelector, ...rest }: IProps) {
  const value = useSelector(fieldSelector(name))

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(name, e.target.value)
  }

  return (
    <TextField
      value={value}
      onChange={handleChange}
      {...rest}
    />
  )
}
