import React from 'react'
import { useSelector } from 'store'

import InputAdornment from '@material-ui/core/InputAdornment'

import SentimentVeryDissatisfied from '@material-ui/icons/SentimentVeryDissatisfied'
import SentimentSatisfied from '@material-ui/icons/SentimentSatisfied'
import SentimentVerySatisfied from '@material-ui/icons/SentimentVerySatisfied'

export default function ContactAbornment({ balance }: { balance: number }) {
  const isFormActive = useSelector(state => !!state.schedule.trainingDialog.recordForm.isActive)

  if (!isFormActive) {
    return null
  }

  return (
    <InputAdornment position='start'>
      {
        balance < 0 && (
          <SentimentVeryDissatisfied color='error' />
        )
      }
      {
        balance === 0 && (
          <SentimentSatisfied color='disabled' />
        )
      }
      {
        balance > 0 && (
          <SentimentVerySatisfied color='primary' />
        )
      }
    </InputAdornment>
  )
}
