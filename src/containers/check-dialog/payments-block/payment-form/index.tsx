import React from 'react'

import { useSelector } from 'store'

import Grid from '@material-ui/core/Grid'
import Box from '@material-ui/core/Box'

import PassSelect from './pass-select'
import AddPassButton from './add-pass-button'
import AmountInput from './amount-input'
import TransactionInput from './transaction-input'
import DestinationSelect from './destination-select'
import CancelButton from './cancel-button'
import SaveButton from './save-button'

export default function PaymentForm() {
  const type = useSelector(state => state.checkDialog.paymentForm?.type)

  return (
    <>
      <Grid container={true} spacing={3}>
        <Grid item={true} lg={12} container={true} justify='space-between'>
          <AmountInput />
        </Grid>
        {
          type === 'units' && (
            <>
              <Grid item={true} lg={8}>
                <PassSelect />
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
                <DestinationSelect />
              </Grid>
              <Grid item={true} lg={12}>
                <TransactionInput />
              </Grid>
            </>
          )
        }
      </Grid>
      <Box marginTop={2}>
        <Grid container={true} justify='space-between'>
          <CancelButton />
          <SaveButton />
        </Grid>
      </Box>
    </>
  )
}
