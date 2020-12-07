import { useCallback, useMemo, MouseEvent } from 'react'
import moment, { Moment } from 'moment'

import IconButton from '@material-ui/core/IconButton'
import { DatePicker, DatePickerProps } from '@material-ui/pickers'
import InputAdornment from '@material-ui/core/InputAdornment'

import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight'
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft'
import Today from '@material-ui/icons/Today'

type OmittedProps = Omit<Omit<DatePickerProps, 'value'>, 'onChange'>

type IProps = OmittedProps & {
  onChange?: any
  value?: any
  error?: {
    message: string
  }
}

const currentDate = moment().startOf('day')

const ActiveDatePicker = (props: IProps) => {
  const { value, error, onChange } = props

  const isCurrentDate = useMemo(
    () => {
      return value.isSame(currentDate)
    }, [value]
  )

  const handleChange = useCallback(
    (date: Moment | null) => {
      onChange(date!)
    }, [onChange]
  )

  const handlePrevDateClick = useCallback(
    (e: MouseEvent) => {
      e.stopPropagation()
      const d = moment(value).subtract(1, 'days')
      handleChange(d)
    }, [handleChange, value]
  )

  const currentDateClick = useCallback(
    (e: MouseEvent) => {
      e.stopPropagation()

      if (!isCurrentDate) {
        handleChange(currentDate)
      }
    }, [handleChange, isCurrentDate]
  )

  const handleNextDateClick = useCallback(
    (e: MouseEvent) => {
      e.stopPropagation()
      const d = moment(value).add(1, 'days')
      handleChange(d)
    }, [handleChange, value]
  )

  return (
    <DatePicker
      {...props}
      value={value ? new Date(value) : null}
      onChange={handleChange}
      error={!!error}
      helperText={error?.message || props.helperText}
      InputProps={{
        endAdornment: (
          <InputAdornment position='end'>
            <IconButton onClick={handlePrevDateClick}>
              <KeyboardArrowLeft />
            </IconButton>
            <IconButton onClick={currentDateClick}>
              <Today color={isCurrentDate ? 'primary' : undefined} />
            </IconButton>
            <IconButton onClick={handleNextDateClick}>
              <KeyboardArrowRight />
            </IconButton>
          </InputAdornment>
        ),
      }}
    />
  )
}

export default ActiveDatePicker
