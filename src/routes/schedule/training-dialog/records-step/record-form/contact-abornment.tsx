import React from 'react'
import { useSelector } from 'store'

import InputAdornment from '@material-ui/core/InputAdornment'
import CircularProgress from '@material-ui/core/CircularProgress'

import SentimentVeryDissatisfied from '@material-ui/icons/SentimentVeryDissatisfied'
import SentimentSatisfied from '@material-ui/icons/SentimentSatisfied'
import SentimentVerySatisfied from '@material-ui/icons/SentimentVerySatisfied'

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
        !loading && data && data.user?.balance < 0 && (
          <SentimentVeryDissatisfied color='error' />
        )
      }
      {
        !loading && data && data.user?.balance === 0 && (
          <SentimentSatisfied color='disabled' />
        )
      }
      {
        !loading && data && data.user?.balance > 0 && (
          <SentimentVerySatisfied color='primary' />
        )
      }
    </InputAdornment>
  )
}
