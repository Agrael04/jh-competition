import React from 'react'

import Button from '@material-ui/core/Button'
import Box from '@material-ui/core/Box'

import { products } from '../../data'
import { useContext } from '../../context'

export default function PassSelect() {
  const { openPassForm, type, service } = useContext(s => ({
    openPassForm: s.actions.openPassForm,
    type: s.state.positionForm?.type,
    service: s.state.positionForm?.service,
  }))

  if (type !== 'pass') {
    return null
  }

  if (service === undefined) {
    return null
  }

  const s: any = products.find(p => p.id === type)?.options.find(o => o.id === service)

  if (s.type === 'open') {
    return null
  }

  return (
    <Box marginY='auto' marginRight={0}>
      <Button color='primary' onClick={openPassForm}>
        Добавить
      </Button>
    </Box>
  )
}
