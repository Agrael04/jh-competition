import React, { useCallback, useMemo } from 'react'
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

  const isCurrentDate = useMemo(
    () => {
      return activeDate.isSame(currentDate)
    }, [activeDate, currentDate]
  )

  const handleDateChange = useCallback(
    (value: any) => {
      updateActiveDate(value)
    },
    [updateActiveDate]
  )

  const handlePrevDateClick = useCallback(
    (e: React.MouseEvent) => {
      e.stopPropagation()
      const d = moment(activeDate).subtract(1, 'days')
      updateActiveDate(d)
    },
    [updateActiveDate]
  )

  const currentDateClick = useCallback(
    (e: React.MouseEvent) => {
      e.stopPropagation()

      if (!isCurrentDate) {
        updateActiveDate(currentDate)
      }
    },
    [isCurrentDate, currentDate, updateActiveDate]
  )

  const handleNextDateClick = useCallback(
    (e: React.MouseEvent) => {
      e.stopPropagation()
      const d = moment(activeDate).add(1, 'days')
      updateActiveDate(d)
    },
    [activeDate, updateActiveDate]
  )

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
