import React from 'react'
import { useActions } from 'store'

import Button from '@material-ui/core/Button'
import Box from '@material-ui/core/Box'

import useGetContactDetailsQuery from '../../graphql/get-contract-details'

export default function PassSelect() {
  const actions = useActions()
  const { data } = useGetContactDetailsQuery()

  const openAddPassForm = React.useCallback(
    () => actions.checkDialog.openPass(data?.user.fullName || ''),
    [actions, data]
  )

  return (
    <Box marginY='auto' marginRight={0}>
      <Button color='primary' onClick={openAddPassForm}>
        Добавить
      </Button>
    </Box>
  )
}
