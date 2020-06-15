import React from 'react'
import { useActions, useSelector } from 'store'

import Button from '@material-ui/core/Button'
import Box from '@material-ui/core/Box'

import { products } from '../../data'

export default function PassSelect() {
  const actions = useActions()
  const type = useSelector(state => state.checkDialog.positionForm?.type)
  const service = useSelector(state => state.checkDialog.positionForm?.service)

  const openAddPassForm = React.useCallback(
    () => {
      actions.checkDialog.openPass()
    },
    [actions]
  )

  if (type !== 'pass') {
    return null
  }

  if (!service) {
    return null
  }

  const s: any = products.find(p => p.id === type)?.options.find(o => o.id === service)

  if (s.type === 'open') {
    return null
  }

  return (
    <Box marginY='auto' marginRight={0}>
      <Button color='primary' onClick={openAddPassForm}>
        Добавить
      </Button>
    </Box>
  )
}
