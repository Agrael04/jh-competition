import React from 'react'
import moment from 'moment'
import { IStoreState, useSelector, useActions } from 'store'

import Toolbar from '@material-ui/core/Toolbar'
import Box from '@material-ui/core/Box'
import Grid from '@material-ui/core/Grid'
import MenuItem from '@material-ui/core/MenuItem'
import IconButton from '@material-ui/core/IconButton'
import ListSubheader from '@material-ui/core/ListSubheader'

import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight'
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft'

import DatePicker from 'containers/date-picker'
import Select from 'containers/select'

import { gyms, resources } from './data'

const activeDateSelector = () => (state: IStoreState) => state.schedule.page.activeDate
const activeGymSelector = () => (state: IStoreState) => state.schedule.page.activeGym
const activeResourcesSelector = () => (state: IStoreState) => state.schedule.page.activeResources

const ToolbarContainer = () => {
  const actions = useActions()
  const activeDate = useSelector(activeDateSelector())

  const handleDateChange = (name: string, value: any) => {
    actions.schedule.page.setActiveDate(value.toDate())
  }

  const handleGymChange = (name: string, value: any) => {
    actions.schedule.page.setActiveGym(value)
  }

  const handleResourcesChange = (name: string, value: any) => {
    actions.schedule.page.setActiveResources(value)
  }

  const handlePrevDateClick = () => {
    const d = moment(activeDate).subtract(1, 'days')
    actions.schedule.page.setActiveDate(d.toDate())
  }

  const handleNextDateClick = () => {
    const d = moment(activeDate).add(1, 'days')
    actions.schedule.page.setActiveDate(d.toDate())
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
              fieldSelector={activeDateSelector}
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
          <Grid container={true} wrap='nowrap'>
            <Select
              name='gym'
              onChange={handleGymChange}
              fieldSelector={activeGymSelector}
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
            <Box marginLeft={1} maxWidth={240}>
              <Select
                name='resources'
                onChange={handleResourcesChange}
                fieldSelector={activeResourcesSelector}
                label={'Ресурсы'}
                fullWidth={true}
                variant='outlined'
                multiple={true}
              >
                <ListSubheader>Батуты</ListSubheader>
                {
                  resources.filter(r => r.type === 'trampoline').map(r => (
                    <MenuItem value={r.id} key={r.id}>
                      {r.name}
                    </MenuItem>
                  ))
                }
                <ListSubheader>Другое</ListSubheader>
                {
                  resources.filter(r => r.type === 'softRoom').map(r => (
                    <MenuItem value={r.id} key={r.id}>
                      {r.name}
                    </MenuItem>
                  ))
                }
              </Select>
            </Box>
          </Grid>
        </Box>
      </Grid>
    </Toolbar>
  )
}

export default ToolbarContainer
