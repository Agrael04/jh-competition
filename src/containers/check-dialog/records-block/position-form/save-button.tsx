import React from 'react'

import Button from '@material-ui/core/Button'

import useCreateCheckPosition from '../../graphql/create-check-position'
import useUpdateCheckPosition from '../../graphql/update-check-position'

import { useContext } from '../../context'

export default function SaveButton() {
  const { form, mode, reset } = useContext(s => ({
    form: s.state.positionForm,
    mode: s.state.positionMode,
    reset: s.actions.resetPosition,
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

      reset()
    },
    [reset, mode, createCheckPosition, updateCheckPosition]
  )

  const disabled = React.useMemo(
    () => {
      if (
        !form ||
        !form.type ||
        (form.service === undefined) ||
        !form.priceType
      ) {
        return true
      }

      return false
    }, [form]
  )

  return (
    <Button color='primary' variant='contained' onClick={save} disabled={disabled}>
      Сохранить
    </Button>
  )
}
