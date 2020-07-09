import React from 'react'

import { useSelector, useActions } from 'store'

import Button from '@material-ui/core/Button'

import useUpdateTrainingRecord from '../../graphql/update-training-record'

export default function SaveButton() {
  const actions = useActions()
  const reset = actions.checkDialog.resetRecord
  const { form } = useSelector(state => ({
    form: state.checkDialog.recordForm,
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
