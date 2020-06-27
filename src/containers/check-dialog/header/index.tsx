import React from 'react'

import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'

import useGetContactDetailsQuery from '../graphql/get-contact-details'

export default function TrainingDialog() {
  const { data } = useGetContactDetailsQuery()

  return (
    <AppBar position='relative'>
      <Toolbar>
        <Typography variant='h6'>
          Чек: {data?.user.fullName} ({data?.user.balance})
        </Typography>
      </Toolbar>
    </AppBar>
  )
}
