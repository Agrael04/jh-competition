import React from 'react'

import Button from '@material-ui/core/Button'

import { useContext } from '../../context'

export default function CancelButton() {
  const { reset } = useContext(s => ({
    reset: s.actions.resetPayment,
  }))

  return (
    <Button onClick={reset} color='primary'>
      Отменить
    </Button>
  )
}
