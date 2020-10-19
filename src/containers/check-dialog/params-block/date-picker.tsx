import React from 'react'
import moment from 'moment'

import { useSelector, useActions } from 'store'

import InputAdornment from '@material-ui/core/InputAdornment'
import IconButton from '@material-ui/core/IconButton'

import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight'
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft'
import Today from '@material-ui/icons/Today'

import { DatePicker } from '@material-ui/pickers'

export default function ActiveDatePicker() {
  const actions = useActions()
  const activeDate = useSelector(state => state.checkDialog.params.activeDate)
  const updateActiveDate = actions.checkDialog.updateActiveDate

  const currentDate = moment().startOf('day')

  const isCurrentDate = React.useMemo(
    () => {
      return activeDate.isSame(currentDate)
    }, [activeDate, currentDate]
  )

  const handleDateChange = (value: any) => {
    updateActiveDate(value)
  }

  const handlePrevDateClick = (e: React.MouseEvent) => {
    e.stopPropagation()
    const d = moment(activeDate).subtract(1, 'days')
    updateActiveDate(d)
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
    updateActiveDate(d)
  }

  return (
    <DatePicker
      name='date'
      onChange={handleDateChange}
      value={activeDate || null}
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
