import React, { useMemo, useCallback } from 'react'
import { useActions } from 'store'

import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'

import Grid from '@material-ui/core/Grid'
import Box from '@material-ui/core/Box'

import useGetContactDetailsQuery from '../graphql/get-contact-details'
import useCloseTrainingRecords from '../graphql/close-training-records'

export default function TrainingDialog() {
  const actions = useActions()
  const { data } = useGetContactDetailsQuery()
  const closeTrainingRecords = useCloseTrainingRecords()

  const pendingCheckPositions = useMemo(
    () => data?.checkPositions.filter(p => p.status === 'PENDING'),
    [data]
  )

  const pendingPayments = useMemo(
    () => data?.payments.filter(p => p.status === 'PENDING'),
    [data]
  )

  const positionsPassAmount = pendingCheckPositions?.filter(p => p.priceType === 'units').reduce((res, p) => res + p.priceAmount, 0) || 0
  const positionsMoneyAmount = pendingCheckPositions?.filter(p => p.priceType === 'money').reduce((res, p) => res + p.priceAmount, 0) || 0

  const paymentPassAmount = pendingPayments?.filter(p => p.type === 'units').reduce((res, p) => res + p.amount, 0) || 0
  const paymentMoneyAmount = pendingPayments?.filter(p => p.type === 'money').reduce((res, p) => res + p.amount, 0) || 0

  const passAmount = paymentPassAmount - positionsPassAmount
  const moneyAmount = paymentMoneyAmount - positionsMoneyAmount

  const close = useCallback(
    async () => {
      await closeTrainingRecords(moneyAmount)
      actions.checkDialog.closeDialog()
    }, [closeTrainingRecords, moneyAmount, actions]
  )

  return (
    <>
      <Grid item={true} lg={4} container={true} direction='column' justify='space-between'>
        <Grid item={true}>
          <Box margin='auto' width='fit-content'>
            <Typography variant='h5' color='primary' align='center'>
              Всего заказано
            </Typography>
            {
              (positionsMoneyAmount)! > 0 && (
                <Typography variant='h6' align='center'>
                  -
                  {positionsMoneyAmount}
                  {' грн'}
                </Typography>
              )
            }
            {
              positionsPassAmount! > 0 && (
                <Typography variant='h6' align='center'>
                  -
                  {positionsPassAmount}
                  {' АБ'}
                </Typography>
              )
            }
          </Box>
        </Grid>
      </Grid>
      <Grid item={true} lg={4} container={true} direction='column' justify='space-between'>
        <Grid item={true}>
          <Box margin='auto' width='fit-content'>
            <Typography variant='h5' color='primary' align='center'>
              Всего поступило
            </Typography>
            {
              paymentMoneyAmount! > 0 && (
                <Typography variant='h6' align='center'>
                  +
                  {paymentMoneyAmount}
                  {' грн'}
                </Typography>
              )
            }
            {
              paymentPassAmount! > 0 && (
                <Typography variant='h6' align='center'>
                  +
                  {paymentPassAmount}
                  {' АБ'}
                </Typography>
              )
            }
          </Box>
        </Grid>
      </Grid>
      <Grid item={true} lg={4} container={true} direction='column' justify='space-between'>
        <Grid item={true}>
          <Box margin='auto' width='fit-content'>
            <Typography variant='h5' color='primary' align='center'>
              Баланс
            </Typography>
            <Typography variant='h6' align='center'>
              {moneyAmount > 0 ? `+${moneyAmount}` : moneyAmount}
              {' грн'}
            </Typography>
            <Typography variant='h6' align='center'>
              {passAmount > 0 ? `+${passAmount}` : passAmount}
              {' АБ'}
            </Typography>
          </Box>
        </Grid>
        <Grid item={true} container={true}>
          <Box marginTop={3} width={1}>
            <Button
              color='primary'
              variant='contained'
              disabled={passAmount !== 0}
              fullWidth={true}
              onClick={close}
            >
              Закрыть чек
            </Button>
          </Box>
        </Grid>
      </Grid>
    </>
  )
}
