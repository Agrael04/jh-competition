import { MouseEvent } from 'react'
import moment, { Moment } from 'moment'

import { useSelector, useDispatch } from 'store'

import InputAdornment from '@material-ui/core/InputAdornment'
import IconButton from '@material-ui/core/IconButton'

import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight'
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft'
import Today from '@material-ui/icons/Today'

import { DatePicker } from '@material-ui/pickers'

import { updateActiveDate } from 'store/ui/dialogs/check-dialog/actions'

export default function ActiveDatePicker() {
  const dispatch = useDispatch()
  const activeDate = useSelector(state => state.ui.dialogs.checkDialog.params.activeDate)
  const updateDate = (value: Moment) => dispatch(updateActiveDate(value))

  const currentDate = moment().startOf('day')

  const isCurrentDate = activeDate.isSame(currentDate)

  const handleDateChange = (value: Moment | null) => {
    if (!value) {
      return
    }

    updateDate(value)
  }

  const handlePrevDateClick = (e: MouseEvent) => {
    e.stopPropagation()
    const d = moment(activeDate).subtract(1, 'days')
    updateDate(d)
  }

  const currentDateClick = (e: MouseEvent) => {
    e.stopPropagation()

    if (!isCurrentDate) {
      updateDate(currentDate)
    }
  }

  const handleNextDateClick = (e: MouseEvent) => {
    e.stopPropagation()
    const d = moment(activeDate).add(1, 'days')
    updateDate(d)
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
