import React from 'react'
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
  const [initAmount, setInitAmount] = React.useState(0)

  const servicePassAmount = data?.trainingRecords.filter(p => p.priceType === 'units').reduce((res, p) => res + p.priceAmount, 0) || 0
  const serviceMoneyAmount = data?.trainingRecords.filter(p => p.priceType === 'money').reduce((res, p) => res + p.priceAmount, 0) || 0

  const positionsMoneyAmount = data?.checkPositions.filter(p => p.priceType === 'money').reduce((res, p) => res + p.priceAmount, 0) || 0

  const paymentPassAmount = data?.payments.filter(p => p.type === 'units').reduce((res, p) => res + p.amount, 0) || 0
  const paymentMoneyAmount = data?.payments.filter(p => p.type === 'money').reduce((res, p) => res + p.amount, 0) || 0

  const passAmount = paymentPassAmount - servicePassAmount
  const moneyAmount = paymentMoneyAmount - serviceMoneyAmount - positionsMoneyAmount

  const close = React.useCallback(
    async () => {
      await closeTrainingRecords(moneyAmount - initAmount)
      actions.checkDialog.close()
    }, [closeTrainingRecords, moneyAmount, initAmount, actions]
  )

  React.useEffect(
    () => {
      if (moneyAmount && !initAmount) {
        setInitAmount(moneyAmount)
      }
    }, [moneyAmount, initAmount, setInitAmount]
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
              (serviceMoneyAmount + positionsMoneyAmount)! > 0 && (
                <Typography variant='h6' align='center'>
                  -{serviceMoneyAmount + positionsMoneyAmount} грн
                </Typography>
              )
            }
            {
              servicePassAmount! > 0 && (
                <Typography variant='h6' align='center'>
                  -{servicePassAmount} АБ
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
                  +{paymentMoneyAmount} грн
                </Typography>
              )
            }
            {
              paymentPassAmount! > 0 && (
                <Typography variant='h6' align='center'>
                  +{paymentPassAmount} АБ
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
              {moneyAmount > 0 ? `+${moneyAmount}` : moneyAmount} грн
            </Typography>
            <Typography variant='h6' align='center'>
              {passAmount > 0 ? `+${passAmount}` : passAmount} АБ
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
