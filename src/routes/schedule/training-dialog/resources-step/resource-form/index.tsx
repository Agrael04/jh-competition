import React from 'react'
import { IStoreState, useSelector, useActions } from 'store'

import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button'
import Chip from '@material-ui/core/Chip'

import AddIcon from '@material-ui/icons/AddCircle'

import ResourceSelect from './resource-select'
import TrainerSelect from './trainer-select'
import StartTimeSelect from './start-time-select'
import EndTimeSelect from './end-time-select'

import SaveButton from './save-button'

import useGetTrainingQuery, { convertTrainingRecordToInput } from '../../../queries/get-training'

const fieldSelector = (name: any) => (state: IStoreState) => {
  const form: any = state.schedule.trainingDialog.resourceForm
  if (form) {
    return form[name]
  }

  return null
}

export default function ResourcesBlock() {
  const actions = useActions()
  const isFormActive = useSelector(state => !!state.schedule.trainingDialog.resourceForm)
  const { trainingForm, _id, mode, traineesAmount } = useSelector(state => ({
    trainingForm: state.schedule.trainingDialog.trainingForm,
    _id: state.schedule.trainingDialog.resourceForm?._id,
    mode: state.schedule.trainingDialog.resourceMode,
    traineesAmount: state.schedule.trainingDialog.trainingForm?.traineesAmount,
  }))
  const trainingQuery = useGetTrainingQuery(trainingForm._id)

  const activateNew = React.useCallback(
    () => {
      if (mode === 'update') {
        actions.schedule.trainingDialog.openCreateRecordForm({ resource: { link: _id! } })
      }
    },
    [actions, _id, mode]
  )

  const activate = React.useCallback(
    (id: string) => () => {
      const record = trainingQuery?.data?.trainingRecords.find(r => r._id === id)

      actions.schedule.trainingDialog.openUpdateRecordForm(
        convertTrainingRecordToInput(record!)
      )
    },
    [actions, trainingQuery]
  )

  const resetResource = actions.schedule.trainingDialog.resetResource

  const disabled = React.useMemo(
    () => {
      return (!traineesAmount || trainingQuery?.data?.trainingRecords.length! >= traineesAmount)
    }, [trainingQuery, traineesAmount]
  )

  if (!isFormActive) {
    return null
  }

  return (
    <Grid item={true} lg={8} container={true} spacing={3}>
      <Grid item={true} lg={12}>
        <ResourceSelect />
      </Grid>
      <Grid item={true} lg={6}>
        <StartTimeSelect
          fieldSelector={fieldSelector}
        />
      </Grid>
      <Grid item={true} lg={6}>
        <EndTimeSelect
          fieldSelector={fieldSelector}
        />
      </Grid>
      <Grid item={true} lg={12}>
        <TrainerSelect />
      </Grid>
      <Grid item={true} lg={12} spacing={1} container={true}>
        {
          mode === 'update' && (
            <Grid item={true}>
              <Chip
                icon={<AddIcon />}
                label='Добавить запись'
                color='primary'
                variant='outlined'
                onClick={activateNew}
                disabled={disabled}
              />
            </Grid>
          )
        }
        {
          trainingQuery?.data?.trainingRecords
            .filter(record => record.resource?._id === _id)
            .map(r => (
              <Grid item={true} key={r._id}>
                <Chip
                  label={r.contact.fullName}
                  color='primary'
                  onClick={activate(r._id)}
                />
              </Grid>
            ))
        }
      </Grid>
      <Grid item={true} lg={12} container={true} justify='space-between'>
        <Button color='primary' onClick={resetResource}>
          Отменить
        </Button>
        <SaveButton />
      </Grid>
    </Grid>
  )
}
