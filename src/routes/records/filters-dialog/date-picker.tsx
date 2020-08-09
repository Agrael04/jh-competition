import React from 'react'
import moment from 'moment'

import { DatePicker } from '@material-ui/pickers'

import { IDefaultComponentProps } from 'components/form-controller'

export default function ActiveDatePicker({ value, onChange }: IDefaultComponentProps) {
  const handleChange = React.useCallback(
    (value: any) => {
      onChange(moment(value).startOf('month'))
    }, [onChange]
  )

  return (
    <DatePicker
      name='date'
      onChange={handleChange}
      value={value}
      disableToolbar={true}
      inputVariant='outlined'
      fullWidth={true}
      format='MMMM YYYY'
      label='Месяц'
      views={['month', 'year']}
    />
  )
}
