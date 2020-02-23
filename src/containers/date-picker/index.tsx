import React from 'react'
import { IStoreState, useSelector } from '../../store'

import { DatePicker } from '@material-ui/pickers'

interface IProps {
  name: any
  fieldSelector: (name: any) => (state: IStoreState) => any
  onChange: (name: any, value: any) => void
  [x: string]: any
}

export default function DatePickerContainer({ name, onChange, fieldSelector, ...rest }: IProps) {
  const value = useSelector(fieldSelector(name))

  const handleChange = (e: any) => {
    onChange(name, e)
  }

  return (
    <DatePicker
      value={value}
      onChange={handleChange}
      {...rest}
    />
  )
}
