import React from 'react'
import { IStoreState, useSelector } from '../../store'

import TextField from '@material-ui/core/TextField'

interface IProps {
  name: any
  onChange: (name: any, value: any) => void
  fieldSelector: (name: any) => (state: IStoreState) => any
  [x: string]: any
}

export default function TextFieldContainer({ name, onChange, fieldSelector, ...rest }: IProps) {
  const selector = React.useMemo(
    () => fieldSelector(name),
    [fieldSelector, name]
  )
  const value = useSelector(selector)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(name, e.target.value)
  }

  return (
    <TextField
      value={(value === null || value === undefined) ? '' : value}
      onChange={handleChange}
      {...rest}
    />
  )
}
