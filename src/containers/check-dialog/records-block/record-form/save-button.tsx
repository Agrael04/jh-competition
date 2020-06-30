import React from 'react'

import Button from '@material-ui/core/Button'

import useUpdateTrainingRecord from '../../graphql/update-training-record'

import { useContext } from '../../context'

export default function SaveButton() {
  const { form, reset } = useContext(s => ({
    form: s.state.recordForm,
    reset: s.actions.resetRecord,
  }))

  const updateTrainingRecord = useUpdateTrainingRecord()

  const save = React.useCallback(
    async () => {
      await updateTrainingRecord()

      reset()
    },
    [reset, updateTrainingRecord]
  )

  const disabled = React.useMemo(
    () => {
      if (!form) {
        return true
      }

      if (!form.priceType) {
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
