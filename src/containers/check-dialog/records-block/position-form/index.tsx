import React from 'react'

import { useForm, Controller, FormProvider } from 'react-hook-form'
import { useSelector, useActions } from 'store'

import Grid from '@material-ui/core/Grid'
import Box from '@material-ui/core/Box'
import Button from '@material-ui/core/Button'

import TypeSelect from './type-select'
import ServiceSelect from './service-select'
import AddPassButton from './add-pass-button'
import PriceAmount from './price-amount'
import PriceTypeToggle from './price-type-toggle'

import useCreateCheckPosition from '../../graphql/create-check-position'
import useUpdateCheckPosition from '../../graphql/update-check-position'

interface IForm {
  type?: string
  service: number
  priceAmount?: number | null
  priceType?: 'money' | 'units' | null
}

export default function ServiceForm() {
  const actions = useActions()
  const form = useSelector(state => state.checkDialog.positionForm)

  const createCheckPosition = useCreateCheckPosition()
  const updateCheckPosition = useUpdateCheckPosition()

  const mutations = {
    create: createCheckPosition,
    update: updateCheckPosition,
  }

  const methods = useForm<IForm>({
    defaultValues: {
      type: form.position!.type,
      service: form.position!.service,
      priceAmount: form.position!.priceAmount,
      priceType: form.position!.priceType,
    },
  })
  const { control, handleSubmit, errors } = methods

  const disabled = Object.keys(errors).length > 0

  const submit = React.useCallback(
    async (position: IForm) => {
      if (!form.mode) {
        return
      }

      await mutations[form.mode]({ ...form.position, ...position })

      actions.checkDialog.closePositionForm()
    },
    [form, mutations, actions]
  )

  const cancel = React.useCallback(
    () => {
      actions.checkDialog.closePositionForm()
    }, [actions]
  )

  return (
    <FormProvider {...methods}>
      <Grid container={true} spacing={3}>
        <Grid item={true} lg={12}>
          <Controller
            control={control}
            name='type'
            render={TypeSelect}
            rules={{ required: true }}
          />
        </Grid>

        <Grid item={true} lg={8}>
          <Controller
            control={control}
            name='service'
            render={ServiceSelect}
            rules={{ required: true }}
          />
        </Grid>

        <Grid item={true} lg={4} container={true} justify='flex-end'>
          <AddPassButton />
        </Grid>

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
