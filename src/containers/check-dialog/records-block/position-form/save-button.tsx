import React from 'react'
import { useSelector, useActions } from 'store'

import Button from '@material-ui/core/Button'

import useUpdateTrainingRecord from '../../graphql/update-training-record'

export default function SaveButton() {
  const actions = useActions()
  const { record } = useSelector(state => ({
    record: state.checkDialog.recordForm,
  }))

  const updateTrainingRecord = useUpdateTrainingRecord()

  const save = React.useCallback(
    async () => {
      await updateTrainingRecord()

      actions.checkDialog.resetRecord()
    },
    [actions, updateTrainingRecord]
  )

  const disabled = React.useMemo(
    () => {
      if (!record) {
        return true
      }

      if (!record.priceAmount) {
        return true
      }

      if (!record.priceType) {
        return true
      }

      return false
    }, [record]
  )

  return (
    <Button color='primary' variant='contained' onClick={save} disabled={disabled}>
      Сохранить
    </Button>
  )
}
