import React from 'react'

import Button from '@material-ui/core/Button'
import Box from '@material-ui/core/Box'

import { useActions } from 'store'

export default function PassSelect() {
  const actions = useActions()
  const openPassForm = actions.checkDialog.openPassForm

  return (
    <Box marginY='auto' marginRight={0}>
      <Button color='primary' onClick={openPassForm}>
        Добавить
      </Button>
    </Box>
  )
}
