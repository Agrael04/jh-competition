import React from 'react'
import moment from 'moment'

import InputAdornment from '@material-ui/core/InputAdornment'
import IconButton from '@material-ui/core/IconButton'

import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight'
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft'
import Today from '@material-ui/icons/Today'

import { DatePicker } from '@material-ui/pickers'

import removeTimeFromDate from 'utils/remove-time-from-date'

import { useContext } from '../context'

export default function ActiveDatePicker() {
  const activeDate = useContext(s => s.state.params.activeDate)
  const updateActiveDate = useContext(s => s.actions.updateActiveDate)

  const currentDate = removeTimeFromDate(new Date())!

  const isCurrentDate = React.useMemo(
    () => {
      return activeDate.getTime() === currentDate?.getTime()
    }, [activeDate, currentDate]
  )

  const handleDateChange = (value: any) => {
    updateActiveDate(value)
  }

  const handlePrevDateClick = (e: React.MouseEvent) => {
    e.stopPropagation()
    const d = moment(activeDate).subtract(1, 'days')
    updateActiveDate(d.toDate())
  }

  const currentDateClick = (e: React.MouseEvent) => {
    e.stopPropagation()

    if (!isCurrentDate) {
      updateActiveDate(currentDate)
    }
  }

  const handleNextDateClick = (e: React.MouseEvent) => {
    e.stopPropagation()
    const d = moment(activeDate).add(1, 'days')
    updateActiveDate(d.toDate())
  }

  return (
    <DatePicker
      name='date'
      onChange={handleDateChange}
      value={activeDate ? new Date(activeDate) : null}
      disableToolbar={true}
      inputVariant='outlined'
      fullWidth={true}
      format='Do MMMM, dddd'
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
