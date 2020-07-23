import React from 'react'

import { useForm, FormProvider } from 'react-hook-form'
import { useSelector, useActions } from 'store'

import Grid from '@material-ui/core/Grid'
import Box from '@material-ui/core/Box'
import Button from '@material-ui/core/Button'

import FormController from 'components/form-controller'

import ContactSuggester from './contact-suggester'
import AttendantSuggester from './attendant-suggester'
import ResourceSelect from './resource-select'
import StatusSelect from './status-select'
import NoteInput from './note-input'

import SubmitButton from './submit-button'

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

  const methods = useForm<IForm>()

  const resetRecord = () => actions.schedule.trainingDialog.closeRecord()
  const openCheckDialog = () => actions.schedule.trainingDialog.openCheckDialog()

  return (
    <FormProvider {...methods}>
      <Grid item={true} lg={8} container={true} spacing={4}>
        <Grid item={true} lg={9}>
          <FormController
            name='contact'
            Component={ContactSuggester}
            rules={{ required: true }}
            defaultValue={form.record!.contact}
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
          <FormController
            name='attendant'
            Component={AttendantSuggester}
            defaultValue={form.record!.attendant}
          />
        </Grid>
        <Grid item={true} lg={3}>
          <FormController
            name='status'
            Component={StatusSelect}
            defaultValue={form.record!.status}
          />
        </Grid>
        <Grid item={true} lg={4}>
          <FormController
            name='note'
            Component={NoteInput}
            defaultValue={form.record!.note}
          />
        </Grid>
        <Grid item={true} lg={12}>
          <FormController
            name='resource'
            Component={ResourceSelect}
            rules={{ required: true }}
            defaultValue={form.record!.resource}
          />
        </Grid>
        <Grid item={true} lg={12} container={true} justify='space-between'>
          <Button color='primary' onClick={resetRecord}>
            Отменить
          </Button>
          <SubmitButton />
        </Grid>
      </Grid>
    </FormProvider>
  )
}
