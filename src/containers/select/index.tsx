import React from 'react'
import { IStoreState, useSelector } from '../../store'

import Select from '../../components/select'

interface IProps {
  name: any
  fieldSelector: (name: any) => (state: IStoreState) => any
  onChange?: (name: any, value: any) => void
  children: any
  [x: string]: any
}

export default function SelectContainer({ name, onChange, fieldSelector, children, ...rest }: IProps) {
  const value = useSelector(fieldSelector(name))

  const v = React.useMemo(
    () => {
      if (Array.isArray(value)) {
        return value
      }

      if (value === undefined || value === null) {
        return ''
      }

      return value?.toString() || ''
    }, [value]
  )

  console.log(v)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (onChange) {
      onChange(name, e.target.value)
    }
  }

  return (
    <Select
      value={v}
      onChange={handleChange}
      {...rest}
    >
      {children}
    </Select>
  )
}
