import React from 'react'
import { useSelector, useActions } from 'store'

import Button from '@material-ui/core/Button'

import useCreateCheckPosition from '../../graphql/create-check-position'
import useUpdateCheckPosition from '../../graphql/update-check-position'

export default function SaveButton() {
  const actions = useActions()
  const { position, mode } = useSelector(state => ({
    position: state.checkDialog.positionForm,
    mode: state.checkDialog.positionMode,
  }))

  const createCheckPosition = useCreateCheckPosition()
  const updateCheckPosition = useUpdateCheckPosition()

  const save = React.useCallback(
    async () => {
      if (mode === 'create') {
        await createCheckPosition()
      }

      if (mode === 'update') {
        await updateCheckPosition()
      }

      actions.checkDialog.resetPosition()
    },
    [actions, mode, createCheckPosition, updateCheckPosition]
  )

  const disabled = React.useMemo(
    () => {
      if (
        !position ||
        !position.type ||
        !position.service ||
        !position.priceAmount ||
        !position.priceType
      ) {
        return true
      }

      return false
    }, [position]
  )

  return (
    <Button color='primary' variant='contained' onClick={save} disabled={disabled}>
      Сохранить
    </Button>
  )
}
