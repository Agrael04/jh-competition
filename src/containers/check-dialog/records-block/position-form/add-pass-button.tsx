import React from 'react'

import { useSelector, useActions } from 'store'

import Button from '@material-ui/core/Button'
import Box from '@material-ui/core/Box'

import { products } from '../../data'

export default function PassSelect() {
  const actions = useActions()
  const openPassForm = actions.checkDialog.openPassForm
  const { type, service } = useSelector(state => ({
    type: state.checkDialog.positionForm?.type,
    service: state.checkDialog.positionForm?.service,
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
