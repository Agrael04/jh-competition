import React from 'react'

import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import IconButton from '@material-ui/core/IconButton'
import Typography from '@material-ui/core/Typography'

import CloseIcon from '@material-ui/icons/Close'

interface IProps {
  close: () => void
}

export default function DialogHeader({ close }: IProps) {
  return (
    <AppBar position='relative'>
      <Toolbar>
        <IconButton edge='start' color='inherit' onClick={close} aria-label='close'>
          <CloseIcon />
        </IconButton>
        <Typography variant='h6'>
          Абонимент
        </Typography>
      </Toolbar>
    </AppBar>
  )
}
