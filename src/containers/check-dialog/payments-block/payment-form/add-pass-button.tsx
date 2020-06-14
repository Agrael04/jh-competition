import React from 'react'
import { useActions } from 'store'

import Button from '@material-ui/core/Button'
import Box from '@material-ui/core/Box'

export default function PassSelect() {
  const actions = useActions()

  const openAddPassForm = React.useCallback(
    () => actions.checkDialog.openPass(),
    [actions]
  )

  return (
    <Box marginY='auto' marginRight={0}>
      <Button color='primary' onClick={openAddPassForm}>
        Добавить
      </Button>
    </Box>
  )
}
