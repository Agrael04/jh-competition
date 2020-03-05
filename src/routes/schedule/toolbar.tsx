import React from 'react'
import { IStoreState, useActions } from 'store'

import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import Box from '@material-ui/core/Box'

import DatePicker from 'containers/date-picker'

const fieldSelector = () => (state: IStoreState) => state.schedule.currentDate

const ToolbarContainer = () => {
  const actions = useActions()

  const handleChange = (name: string, value: any) => {
    actions.schedule.setCurrentDate(value.toDate())
  }

  return (
    <Toolbar>
      <Typography variant='body1'>
        Schedule for:
      </Typography>
      <Box marginLeft={0.5}>
        <DatePicker
          name='date'
          onChange={handleChange}
          fieldSelector={fieldSelector}
          disableToolbar={true}
        />
      </Box>
    </Toolbar>
  )
}

export default ToolbarContainer
