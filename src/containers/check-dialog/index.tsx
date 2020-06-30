import React from 'react'

import Root from './root'
import { Provider } from './context'

interface IProps {
  activeDate: Date
  activeGym: string
  contact: string | null
  opened: boolean
}

export default function CheckDialogWrap({ activeDate, activeGym, contact, opened }: IProps) {
  const initialState = {
    params: {
      contact: contact ? { link: contact } : null,
      activeDate,
      activeGym,
    },
    recordForm: null,
    recordMode: null,

    positionForm: null,
    positionMode: null,

    paymentForm: null,
    paymentMode: null,

    openedPassForm: false,
  }

  if (!opened) {
    return null
  }

  return (
    <Provider initialState={initialState}>
      <Root />
    </Provider>
  )
}
