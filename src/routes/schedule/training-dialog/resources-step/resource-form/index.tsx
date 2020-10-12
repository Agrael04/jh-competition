import React from 'react'

import { useForm, FormProvider } from 'react-hook-form'
import { useSelector, useActions } from 'store'

import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button'
import Chip from '@material-ui/core/Chip'

import AddIcon from '@material-ui/icons/AddCircle'

import getClientLabel from 'utils/get-client-label'

import FormController from 'containers/fields/form-controller'

import ResourceSelect from './resource-select'
import TrainerSelect from './trainer-select'
import StartTimeSelect from './start-time-select'
import EndTimeSelect from './end-time-select'

import SubmitButton from './submit-button'

import useGetTrainingQuery, { convertTrainingRecordToInput } from '../../../queries/get-training'

export interface IResourceForm {
  resource?: {
    link: string
  } | null
  trainer?: {
    link: string
  } | null
  startTime?: number | null
  endTime?: number | null
}

export default function ResourcesBlock() {
  const actions = useActions()
  const form = useSelector(state => state.schedule.trainingDialog.resourceForm)
  const _id = useSelector(state => state.schedule.trainingDialog._id)

  const methods = useForm<IResourceForm>({
    defaultValues: form.resource || undefined,
  })

  const trainingQuery = useGetTrainingQuery(_id)
  const traineesAmount = trainingQuery.data?.training.traineesAmount

  const activateNew = React.useCallback(
    () => {
      if (form.mode === 'update') {
        actions.schedule.trainingDialog.openCreateRecordForm({ resource: { link: form.resource!._id! } })
      }
    },
    [actions, form]
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

  const resetResource = () => actions.schedule.trainingDialog.closeResource()

  const disabled = React.useMemo(
    () => {
      return (!traineesAmount || trainingQuery?.data?.trainingRecords.length! >= traineesAmount)
    }, [trainingQuery, traineesAmount]
  )

  return (
    <FormProvider {...methods}>
      <Grid item={true} lg={8} container={true} spacing={3}>
        <Grid item={true} lg={12}>
          <FormController name='resource' rules={{ required: true }}>
            <ResourceSelect />
          </FormController>
        </Grid>
        <Grid item={true} lg={6}>
          <FormController name='startTime' rules={{ required: true }}>
            <StartTimeSelect />
          </FormController>
        </Grid>
        <Grid item={true} lg={6}>
          <FormController name='endTime' rules={{ required: true }}>
            <EndTimeSelect />
          </FormController>
        </Grid>
        <Grid item={true} lg={12}>
          <FormController name='trainer'>
            <TrainerSelect />
          </FormController>
        </Grid>
        <Grid item={true} lg={12} spacing={1} container={true}>
          {
            form.mode === 'update' && (
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
              .filter(record => record.resource?._id === form.resource?._id)
              .map(r => (
                <Grid item={true} key={r._id}>
                  <Chip
                    label={getClientLabel(r?.contact)}
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
          <SubmitButton />
        </Grid>
      </Grid>
    </FormProvider>
  )
}
