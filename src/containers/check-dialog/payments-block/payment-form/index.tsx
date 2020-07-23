import React from 'react'

import { useForm, FormProvider } from 'react-hook-form'
import { useSelector, useActions } from 'store'

import FormController from 'components/form-controller'

import Grid from '@material-ui/core/Grid'
import Box from '@material-ui/core/Box'
import Button from '@material-ui/core/Button'

import PassSelect from './pass-select'
import AddPassButton from './add-pass-button'
import AmountInput from './amount-input'
import TransactionInput from './transaction-input'
import DestinationSelect from './destination-select'
import TypeToggle from './type-toggle'

import SubmitButton from './submit-button'

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

  const methods = useForm<IForm>()
  const type = methods.watch('type')

  const cancel = React.useCallback(
    () => {
      actions.checkDialog.closePaymentForm()
    }, [actions]
  )

  return (
    <FormProvider {...methods}>
      <Grid container={true} spacing={3}>
        <Grid item={true} lg={8} container={true} justify='space-between'>
          <FormController
            name='amount'
            Component={AmountInput}
            rules={{ required: true }}
            defaultValue={form.payment!.amount}
          />
        </Grid>
        <Grid item={true} lg={4} container={true} justify='space-between'>
          <Box margin='auto'>
            <FormController
              name='type'
              Component={TypeToggle}
              rules={{ required: true }}
              defaultValue={form.payment!.type}
            />
          </Box>
        </Grid>
        {
          type === 'units' && (
            <>
              <Grid item={true} lg={8}>
                <FormController
                  name='pass'
                  Component={PassSelect}
                  rules={{ required: type === 'units' }}
                  defaultValue={form.payment!.pass}
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
                <FormController
                  name='destination'
                  Component={DestinationSelect}
                  rules={{ required: type === 'money' }}
                  defaultValue={form.payment!.destination}
                />
              </Grid>
              <Grid item={true} lg={12}>
                <FormController
                  name='transaction'
                  Component={TransactionInput}
                  rules={{ required: type === 'money' }}
                  defaultValue={form.payment!.transaction}
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
          <SubmitButton />
        </Grid>
      </Box>
    </FormProvider>
  )
}
