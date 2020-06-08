import React from 'react'
import { useActions } from 'store'

import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import IconButton from '@material-ui/core/IconButton'
import Typography from '@material-ui/core/Typography'

import CloseIcon from '@material-ui/icons/Close'

export default function DialogHeader() {
  const actions = useActions()

  const close = React.useCallback(
    () => actions.passForm.close(),
    [actions]
  )

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
