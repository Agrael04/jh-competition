import React from 'react'

import Button from '@material-ui/core/Button'
import Box from '@material-ui/core/Box'

import { useContext } from '../../context'

export default function PassSelect() {
  const openPassForm = useContext(s => s.actions.openPassForm)

  return (
    <Box marginY='auto' marginRight={0}>
      <Button color='primary' onClick={openPassForm}>
        Добавить
      </Button>
    </Box>
  )
}
