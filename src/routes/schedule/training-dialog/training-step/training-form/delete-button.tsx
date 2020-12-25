import { useCallback, useMemo } from 'react'
import { useSelector, useDispatch } from 'store'
import { createSelector } from 'reselect'

import Button from '@material-ui/core/Button'

import { close } from 'store/ui/pages/schedule/training-dialog/actions'
import { selectState, selectTrainingId } from 'store/ui/pages/schedule/training-dialog/selectors'

import useDeleteTraining from '../../../mutations/delete-training'

import useGetTrainingQuery from '../../../queries/get-training'

const selectProps = createSelector(
  selectState,
  selectTrainingId,
  (state, _id) => ({
    _id,
    mode: state.trainingForm.mode,
  })
)

export default function TrainingDialog() {
  const dispatch = useDispatch()
  const { mode, _id } = useSelector(selectProps)
  const trainingQuery = useGetTrainingQuery(_id)

  const deleteTraining = useDeleteTraining()

  const remove = useCallback(
    async () => {
      await deleteTraining()

      dispatch(close())
    },
    [deleteTraining]
  )

  const disabled = useMemo(
    () => {
      return trainingQuery.data?.trainingRecords.length! > 0
    }, [trainingQuery]
  )

  if (mode === 'create') {
    return <div />
  }

  return (
    <Button variant='text' color='primary' onClick={remove} disabled={disabled}>
      Удалить
    </Button>
  )
}
