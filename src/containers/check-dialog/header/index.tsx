import React from 'react'
import { useActions } from 'store'

import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import IconButton from '@material-ui/core/IconButton'
import Typography from '@material-ui/core/Typography'

import CloseIcon from '@material-ui/icons/Close'

import useGetContactDetailsQuery from '../graphql/get-contact-details'

export default function TrainingDialog() {
  const { data } = useGetContactDetailsQuery()

  const actions = useActions()

  const close = React.useCallback(
    () => actions.checkDialog.close(),
    [actions]
  )

  return (
    <AppBar position='relative'>
      <Toolbar>
        <IconButton edge='start' color='inherit' onClick={close} aria-label='close'>
          <CloseIcon />
        </IconButton>
        <Typography variant='h6'>
          Чек: {data?.user.fullName}
        </Typography>
      </Toolbar>
    </AppBar>
  )
}
