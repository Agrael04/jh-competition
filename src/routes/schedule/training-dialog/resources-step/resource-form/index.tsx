import React from 'react'

import { useForm, FormProvider } from 'react-hook-form'
import { useSelector, useActions } from 'store'

import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button'
import Chip from '@material-ui/core/Chip'

import AddIcon from '@material-ui/icons/AddCircle'

import FormController from 'components/form-controller'

import getClientLabel from 'utils/get-client-label'

import ResourceSelect from './resource-select'
import TrainerSelect from './trainer-select'
import StartTimeSelect from './start-time-select'
import EndTimeSelect from './end-time-select'

import SubmitButton from './submit-button'

import useGetTrainingQuery, { convertTrainingRecordToInput } from '../../../queries/get-training'

interface IForm {
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

  const methods = useForm<IForm>()
  const { trainingForm, traineesAmount } = useSelector(state => ({
    trainingForm: state.schedule.trainingDialog.trainingForm,
    traineesAmount: state.schedule.trainingDialog.trainingForm?.traineesAmount,
  }))
  const trainingQuery = useGetTrainingQuery(trainingForm._id)

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
          <FormController
            name='resource'
            Component={ResourceSelect}
            rules={{ required: true }}
            defaultValue={form.resource!.resource}
          />
        </Grid>
        <Grid item={true} lg={6}>
          <FormController
            name='startTime'
            Component={StartTimeSelect}
            rules={{ required: true }}
            defaultValue={form.resource!.startTime}
          />
        </Grid>
        <Grid item={true} lg={6}>
          <FormController
            name='endTime'
            Component={EndTimeSelect}
            rules={{ required: true }}
            defaultValue={form.resource!.endTime}
          />
        </Grid>
        <Grid item={true} lg={12}>
          <FormController
            name='trainer'
            Component={TrainerSelect}
            defaultValue={form.resource!.trainer}
          />
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
