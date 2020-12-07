import { useCallback } from 'react'
import { Moment } from 'moment'

import { DatePicker as MaterialDatePicker, DatePickerProps } from '@material-ui/pickers'

type OmittedProps = Omit<Omit<DatePickerProps, 'value'>, 'onChange'>

type IProps = OmittedProps & {
  onChange?: any
  value?: any
  error?: {
    message: string
  }
}

export default function DatePicker(props: IProps) {
  const { value, error, onChange } = props

  const handleChange = useCallback(
    (date: Moment | null) => {
      onChange(date)
    },
    [onChange]
  )

  return (
    <MaterialDatePicker
      {...props}
      value={value ? new Date(value) : null}
      onChange={handleChange}
      error={!!error}
      helperText={error?.message || props.helperText}
    />
  )
}
