import React from 'react'

import { useForm, FormProvider } from 'react-hook-form'
import { useSelector, useActions } from 'store'

import Grid from '@material-ui/core/Grid'
import Box from '@material-ui/core/Box'
import Button from '@material-ui/core/Button'
import MenuItem from '@material-ui/core/MenuItem'

import ContactAbornment from './contact-abornment'

import FormController from 'containers/fields/form-controller'
import TextInput from 'containers/fields/text-input'
import Select from 'containers/fields/select'
import ClientSuggester from 'containers/fields/client-suggester'

import { getTimeLabel } from 'data/times'
import getClientLabel from 'utils/get-client-label'
import { requiredValidation } from 'utils/validations'

import useGetTrainingQuery from '../../../queries/get-training'

import SubmitButton from './submit-button'

import { statuses } from './data'
import IRecordForm from './form'

export default function RecordsBlock() {
  const actions = useActions()
  const defaultValues = useSelector(state => state.schedule.trainingDialog.recordForm.defaultValues)
  const { _id, recordId } = useSelector(state => ({
    _id: state.schedule.trainingDialog._id,
    recordId: state.schedule.trainingDialog.recordForm._id,
  }))
  const trainingQuery = useGetTrainingQuery(_id)

  const methods = useForm<IRecordForm>({
    defaultValues,
  })
  const contact = methods.watch('contact')

  const resetRecord = () => actions.schedule.trainingDialog.closeRecord()
  const openCheckDialog = () => actions.schedule.trainingDialog.openCheckDialog()

  const queryRecord = React.useMemo(
    () => {
      return trainingQuery.data?.trainingRecords.find(tr => tr._id === recordId)
    }, [trainingQuery, recordId]
  )

  const getResourceLabel = React.useCallback(
    resource => {
      const name = resource?.resource?.name
      const st = getTimeLabel(resource.startTime)
      const et = getTimeLabel(resource.endTime)
      const recordsLength = trainingQuery.data?.trainingRecords.filter(r => r.resource?._id === resource._id).length

      return `${name}, ${st} - ${et}, ${recordsLength} записей`
    },
    [trainingQuery]
  )

  const attendantLabel = getClientLabel(queryRecord?.attendant)
  const contactLabel = getClientLabel(queryRecord?.contact)
  const contactBalance = queryRecord?.contact?.balance

  return (
    <FormProvider {...methods}>
      <Grid item={true} lg={8} container={true} spacing={4}>
        <Grid item={true} lg={5}>
          <FormController name='contact' rules={requiredValidation}>
            <ClientSuggester
              initialFilter={contactLabel}
              initialBalance={contactBalance}
              StartAdornment={ContactAbornment}
              rights={['RECORD']}
              label='Контактное лицо'
            />
          </FormController>
        </Grid>
        <Grid item={true} lg={4} />
        <Grid item={true} lg={3} container={true}>
          <Box margin='auto' marginRight={0}>
            <Button color='primary' variant='contained' onClick={openCheckDialog} disabled={!contact}>
              Расчитать
            </Button>
          </Box>
        </Grid>
        <Grid item={true} lg={5}>
          <FormController name='attendant'>
            <ClientSuggester
              initialFilter={attendantLabel}
              rights={['ATTEND']}
              label='Посетитель'
            />
          </FormController>
        </Grid>
        <Grid item={true} lg={3}>
          <FormController name='status'>
            <Select
              label='Статус'
              fullWidth={true}
              variant='outlined'
            >
              {
                statuses.map(type => (
                  <MenuItem value={type} key={type}>
                    {type}
                  </MenuItem>
                ))
              }
            </Select>
          </FormController>
        </Grid>
        <Grid item={true} lg={4}>
          <FormController name='note'>
            <TextInput
              label={'Заметки'}
              fullWidth={true}
              variant='outlined'
            />
          </FormController>
        </Grid>
        <Grid item={true} lg={12}>
          <FormController name='resource' rules={requiredValidation}>
            <Select
              label='Ресурс'
              fullWidth={true}
              variant='outlined'
              linked={true}
            >
              {
                trainingQuery.data?.trainingResources.map(r => (
                  <MenuItem value={r._id} key={r._id}>
                    {getResourceLabel(r)}
                  </MenuItem>
                ))
              }
            </Select>
          </FormController>
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
