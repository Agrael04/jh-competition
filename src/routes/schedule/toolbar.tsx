import React from 'react'
import moment from 'moment'
import { IStoreState, useSelector, useActions } from 'store'

import Toolbar from '@material-ui/core/Toolbar'
import Box from '@material-ui/core/Box'
import Grid from '@material-ui/core/Grid'
import MenuItem from '@material-ui/core/MenuItem'
import IconButton from '@material-ui/core/IconButton'

import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight'
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft'

import DatePicker from 'containers/date-picker'
import Select from 'containers/select'

const currentDateSelector = () => (state: IStoreState) => state.schedule.page.currentDate
const currentGymSelector = () => (state: IStoreState) => state.schedule.page.currentGym

const gyms = [
  { id: 1, text: 'Берестейська' },
  { id: 2, text: 'Харькiвське шосе' },
  { id: 3, text: 'Почайна' },
  { id: 4, text: 'Парк дружбы народов' },
]

const ToolbarContainer = () => {
  const actions = useActions()
  const currentDate = useSelector(currentDateSelector())

  const handleGymChange = (name: string, value: any) => {
    actions.schedule.page.setCurrentGym(value)
  }

  const handleDateChange = (name: string, value: any) => {
    actions.schedule.page.setCurrentDate(value.toDate())
  }

  const handlePrevDateClick = () => {
    const d = moment(currentDate).subtract(1, 'days')
    actions.schedule.page.setCurrentDate(d.toDate())
  }

  const handleNextDateClick = () => {
    const d = moment(currentDate).add(1, 'days')
    actions.schedule.page.setCurrentDate(d.toDate())
  }

  return (
    <Toolbar>
      <Grid container={true} justify='space-between'>
        <Box marginY={1}>
          <Grid container={true} wrap='nowrap'>
            <IconButton onClick={handlePrevDateClick}>
              <KeyboardArrowLeft />
            </IconButton>
            <DatePicker
              name='date'
              onChange={handleDateChange}
              fieldSelector={currentDateSelector}
              disableToolbar={true}
              inputVariant='outlined'
              fullWidth={true}
            />
            <IconButton onClick={handleNextDateClick}>
              <KeyboardArrowRight />
            </IconButton>
          </Grid>
        </Box>
        <Box marginY={1}>
          <Select
            name='gym'
            onChange={handleGymChange}
            fieldSelector={currentGymSelector}
            label={'Зал'}
            fullWidth={true}
            variant='outlined'
          >
            {
              gyms.map(gym => (
                <MenuItem value={gym.id} key={gym.id}>
                  {gym.text}
                </MenuItem>
              ))
            }
          </Select>
        </Box>
      </Grid>
    </Toolbar>
  )
}

export default ToolbarContainer
