import React from 'react'

import { useForm, Controller, FormProvider } from 'react-hook-form'
import { useSelector, useActions } from 'store'

import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid'
import Box from '@material-ui/core/Box'
import Button from '@material-ui/core/Button'

import PriceAmount from './price-amount'
import PriceTypeToggle from './price-type-toggle'

import useGetContactDetailsQuery from '../../graphql/get-contact-details'
import useUpdateTrainingRecord from '../../graphql/update-training-record'

import { getTimeLabel } from 'data/times'

interface IForm {
  priceAmount?: number | null
  priceType?: 'money' | 'units' | null
}

export default function RecordForm() {
  const actions = useActions()
  const form = useSelector(state => state.checkDialog.recordForm)

  const { data } = useGetContactDetailsQuery()
  const updateTrainingRecord = useUpdateTrainingRecord()

  const record = data?.trainingRecords.find(tr => tr._id === form.record!._id)

  const methods = useForm<IForm>({
    defaultValues: {
      priceAmount: form.record!.priceAmount,
      priceType: form.record!.priceType,
    },
  })
  const { control, handleSubmit, errors } = methods
  const disabled = Object.keys(errors).length > 0

  const submit = React.useCallback(
    async (record: IForm) => {
      if (!form.mode) {
        return
      }

      await updateTrainingRecord({ ...form.record, ...record })

      actions.checkDialog.closeRecordForm()
    },
    [updateTrainingRecord, actions, form]
  )

  const cancel = React.useCallback(
    () => {
      actions.checkDialog.closeRecordForm()
    }, [actions]
  )

  return (
    <FormProvider {...methods}>
      <div>
        <Typography variant='body1'>
          {record?.training.type} {record?.training.name}
        </Typography>
        <Box marginTop={2}>
          <Typography variant='body1'>
            {record?.resource.resource.name}
            {', '}
            {getTimeLabel(record?.resource.startTime)}
            {' - '}
            {getTimeLabel(record?.resource.endTime)}
            {
              record?.resource.trainer && (
                <>
                  {', '}
                  {record?.resource.trainer.firstName}
                  {' '}
                  {record?.resource.trainer.lastName}
                </>
              )
            }
          </Typography>
        </Box>
        {
          record?.attendant && (
            <Box marginTop={2}>
              <Typography variant='body1'>
                {record?.attendant.fullName}
              </Typography>
            </Box>
          )
        }

        <Box marginTop={4}>
          <Grid container={true}>
            <Grid item={true} lg={8}>
              <Controller
                control={control}
                name='priceAmount'
                render={PriceAmount}
                rules={{ required: true }}
              />
            </Grid>
            <Grid item={true} lg={4} container={true}>
              <Box margin='auto'>
                <Controller
                  control={control}
                  name='priceType'
                  render={PriceTypeToggle}
                  rules={{ required: true }}
                />
              </Box>
            </Grid>
          </Grid>
        </Box>
      </div>
      <Box marginTop={2}>
        <Grid container={true} justify='space-between'>
          <Button onClick={cancel} color='primary'>
            Отменить
          </Button>
          <Button color='primary' variant='contained' onClick={handleSubmit(submit)} disabled={disabled}>
            Сохранить
          </Button>
        </Grid>
      </Box>
    </FormProvider>
  )
}
