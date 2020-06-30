import React from 'react'

import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'

export default function TrainingDialog() {
  return (
    <AppBar position='relative'>
      <Toolbar>
        <Typography variant='h6'>
          Чек
        </Typography>
      </Toolbar>
    </AppBar>
  )
}
