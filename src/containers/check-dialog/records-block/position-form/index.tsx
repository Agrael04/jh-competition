import React from 'react'

import { useForm, FormProvider } from 'react-hook-form'
import { useSelector, useActions } from 'store'

import Grid from '@material-ui/core/Grid'
import Box from '@material-ui/core/Box'
import Button from '@material-ui/core/Button'

import FormController from 'components/form-controller'

import TypeSelect from './type-select'
import ServiceSelect from './service-select'
import AddPassButton from './add-pass-button'
import PriceAmount from './price-amount'
import PriceTypeToggle from './price-type-toggle'

import SubmitButtom from './submit-button'

interface IForm {
  type?: string
  service: number
  priceAmount?: number | null
  priceType?: 'money' | 'units' | null
}

export default function ServiceForm() {
  const actions = useActions()
  const form = useSelector(state => state.checkDialog.positionForm)

  const methods = useForm<IForm>({
    defaultValues: {
      type: form.position!.type,
      service: form.position!.service,
      priceAmount: form.position!.priceAmount,
      priceType: form.position!.priceType,
    },
  })

  const cancel = React.useCallback(
    () => {
      actions.checkDialog.closePositionForm()
    }, [actions]
  )

  return (
    <FormProvider {...methods}>
      <Grid container={true} spacing={3}>
        <Grid item={true} lg={12}>
          <FormController
            name='type'
            Component={TypeSelect}
            rules={{ required: true }}
          />
        </Grid>

        <Grid item={true} lg={8}>
          <FormController
            name='service'
            Component={ServiceSelect}
            rules={{ required: true }}
          />
        </Grid>

        <Grid item={true} lg={4} container={true} justify='flex-end'>
          <AddPassButton />
        </Grid>

        <Grid item={true} lg={8}>
          <FormController
            name='priceAmount'
            Component={PriceAmount}
            rules={{ required: true }}
          />
        </Grid>
        <Grid item={true} lg={4} container={true}>
          <Box margin='auto'>
            <FormController
              name='priceType'
              Component={PriceTypeToggle}
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
          <SubmitButtom />
        </Grid>
      </Box>
    </FormProvider>
  )
}
