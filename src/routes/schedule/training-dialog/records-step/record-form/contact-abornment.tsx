import React from 'react'
import { useSelector } from 'store'

import InputAdornment from '@material-ui/core/InputAdornment'
import CircularProgress from '@material-ui/core/CircularProgress'

import AccountCircle from '@material-ui/icons/AccountCircle'
import Error from '@material-ui/icons/Error'

import useGetUserDebt from '../../../queries/get-user-debt'

export default function ContactAbornment() {
  const isFormActive = useSelector(state => !!state.schedule.trainingDialog.recordForm)
  const { contactId } = useSelector(state => ({
    contactId: state.schedule.trainingDialog.recordForm?.contact?.link,
  }))
  const { data, loading } = useGetUserDebt(contactId)

  if (!isFormActive) {
    return null
  }

  return (
    <InputAdornment position='start'>
      {
        loading && (
          <CircularProgress size={24} />
        )
      }
      {
        !loading && data && data.payments?.length > 0 && (
          <Error color='error' />
        )
      }
      {
        !loading && data && data.payments?.length === 0 && (
          <AccountCircle color='primary' />
        )
      }
    </InputAdornment>
  )
}
