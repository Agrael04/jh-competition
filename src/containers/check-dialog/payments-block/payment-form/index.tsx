import React from 'react'

import { useForm, Controller, FormProvider } from 'react-hook-form'
import { useSelector, useActions } from 'store'

import Grid from '@material-ui/core/Grid'
import Box from '@material-ui/core/Box'
import Button from '@material-ui/core/Button'

import PassSelect from './pass-select'
import AddPassButton from './add-pass-button'
import AmountInput from './amount-input'
import TransactionInput from './transaction-input'
import DestinationSelect from './destination-select'
import TypeToggle from './type-toggle'

import useCreatePayment from '../../graphql/create-payment'
import useUpdatePayment from '../../graphql/update-payment'

interface IForm {
  amount?: number | null
  type?: 'money' | 'units' | null
  pass?: {
    link: string
  }
  destination?: string
  transaction?: string
}

export default function PaymentForm() {
  const actions = useActions()
  const form = useSelector(state => state.checkDialog.paymentForm)

  const createPayment = useCreatePayment()
  const updatePayment = useUpdatePayment()

  const mutations = {
    create: createPayment,
    update: updatePayment,
  }

  const methods = useForm<IForm>({
    defaultValues: {
      amount: form.payment!.amount,
      type: form.payment!.type,
      pass: form.payment!.pass,
      destination: form.payment!.destination,
      transaction: form.payment!.transaction,
    },
  })
  const { control, handleSubmit, watch, errors } = methods
  const type = watch('type')

  const disabled = Object.keys(errors).length > 0

  const submit = React.useCallback(
    async (payment: IForm) => {
      if (!form.mode) {
        return
      }

      await mutations[form.mode]({ ...form.payment, ...payment })

      actions.checkDialog.closePaymentForm()
    },
    [form, mutations, actions]
  )

  const cancel = React.useCallback(
    () => {
      actions.checkDialog.closePaymentForm()
    }, [actions]
  )

  return (
    <FormProvider {...methods}>
      <Grid container={true} spacing={3}>
        <Grid item={true} lg={8} container={true} justify='space-between'>
          <Controller
            control={control}
            name='amount'
            render={AmountInput}
            rules={{ required: true }}
          />
        </Grid>
        <Grid item={true} lg={4} container={true} justify='space-between'>
          <Box margin='auto'>
            <Controller
              control={control}
              name='type'
              render={TypeToggle}
              rules={{ required: true }}
            />
          </Box>
        </Grid>
        {
          type === 'units' && (
            <>
              <Grid item={true} lg={8}>
                <Controller
                  control={control}
                  name='pass'
                  render={PassSelect}
                  rules={{ required: type === 'units' }}
                />
              </Grid>
              <Grid item={true} lg={4} container={true} justify='flex-end'>
                <AddPassButton />
              </Grid>
            </>
          )
        }
        {
          type === 'money' && (
            <>
              <Grid item={true} lg={12}>
                <Controller
                  control={control}
                  name='destination'
                  render={DestinationSelect}
                  rules={{ required: type === 'money' }}
                />
              </Grid>
              <Grid item={true} lg={12}>
                <Controller
                  control={control}
                  name='transaction'
                  render={TransactionInput}
                  rules={{ required: type === 'money' }}
                />
              </Grid>
            </>
          )
        }
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
