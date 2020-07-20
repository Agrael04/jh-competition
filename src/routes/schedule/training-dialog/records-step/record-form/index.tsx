import React from 'react'

import { useForm, Controller, FormProvider } from 'react-hook-form'
import { useSelector, useActions } from 'store'

import Grid from '@material-ui/core/Grid'
import Box from '@material-ui/core/Box'
import Button from '@material-ui/core/Button'

import ContactSuggester from './contact-suggester'
import AttendantSuggester from './attendant-suggester'
import ResourceSelect from './resource-select'
import StatusSelect from './status-select'
import NoteInput from './note-input'

import useUpdateTrainingRecord from '../../../mutations/update-training-record'
import useCreateTrainingRecord from '../../../mutations/create-training-record'

import useGetTrainingQuery from '../../../queries/get-training'

interface IForm {
  contact?: {
    link: string
  } | null
  attendant?: {
    link: string
  } | null
  resource?: {
    link: string
  } | null
  status?: string | null
  note?: string | null
}

export default function RecordsBlock() {
  const actions = useActions()
  const form = useSelector(state => state.schedule.trainingDialog.recordForm)
  const { _id } = useSelector(state => ({
    _id: state.schedule.trainingDialog._id,
  }))

  const trainingQuery = useGetTrainingQuery(_id)
  const updateTrainingRecord = useUpdateTrainingRecord()
  const createTrainingRecord = useCreateTrainingRecord()

  const methods = useForm<IForm>({
    defaultValues: {
      contact: form.record!.contact,
      attendant: form.record!.attendant,
      resource: form.record!.resource,
      status: form.record!.status,
      note: form.record!.note,
    },
  })
  const { control, handleSubmit, errors } = methods
  const disabled = Object.keys(errors).length > 0

  const resetRecord = () => actions.schedule.trainingDialog.closeRecord()
  const openCheckDialog = () => actions.schedule.trainingDialog.openCheckDialog()

  const submit = React.useCallback(
    async (record: IForm) => {
      if (!form.mode) {
        return
      }

      if (form.mode === 'update') {
        const r = trainingQuery.data?.trainingRecords.find(record => record._id === record?._id)
        await updateTrainingRecord({ ...form.record, ...record }, r?.resource._id)
      }

      if (form.mode === 'create') {
        await createTrainingRecord({ ...form.record, ...record })
      }

      actions.schedule.trainingDialog.closeRecord()
    },
    [form, trainingQuery, updateTrainingRecord, createTrainingRecord, actions]
  )

  return (
    <FormProvider {...methods}>
      <Grid item={true} lg={8} container={true} spacing={4}>
        <Grid item={true} lg={9}>
          <Controller
            control={control}
            name='contact'
            render={ContactSuggester}
            rules={{ required: true }}
          />
        </Grid>
        <Grid item={true} lg={3} container={true}>
          <Box margin='auto' marginRight={0}>
            <Button color='primary' variant='contained' onClick={openCheckDialog}>
              Расчитать
            </Button>
          </Box>
        </Grid>
        <Grid item={true} lg={5}>
          <Controller
            control={control}
            name='contact'
            render={AttendantSuggester}
          />
        </Grid>
        <Grid item={true} lg={3}>
          <Controller
            control={control}
            name='status'
            render={StatusSelect}
          />
        </Grid>
        <Grid item={true} lg={4}>
          <Controller
            control={control}
            name='note'
            render={NoteInput}
          />
        </Grid>
        <Grid item={true} lg={12}>
          <Controller
            control={control}
            name='resource'
            render={ResourceSelect}
            rules={{ required: true }}
          />
        </Grid>
        <Grid item={true} lg={12} container={true} justify='space-between'>
          <Button color='primary' onClick={resetRecord}>
            Отменить
          </Button>
          <Button color='primary' variant='contained' onClick={handleSubmit(submit)} disabled={disabled}>
            Сохранить
          </Button>
        </Grid>
      </Grid>
    </FormProvider>
  )
}
