import { useCallback, ChangeEvent } from 'react'

import Select, { ISelectProps } from 'components/select'

type IProps = ISelectProps & {
  onChange?: any
  value?: any
  error?: {
    message: string
  }
  linked?: boolean
}

export default function SelectWrap(props: IProps) {
  const { value, error, onChange, linked } = props

  const handleChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      onChange(linked ? { link: e.target.value } : e.target.value)
    },
    [onChange, linked]
  )

  const wrapValue = (linked ? value?.link : value) || ''

  return (
    <Select
      {...props}
      value={wrapValue}
      onChange={handleChange}
      error={!!error}
      helperText={error?.message || props.helperText}
    />
  )
}
