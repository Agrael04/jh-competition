import React from 'react'

import Typography from '@material-ui/core/Typography'

import Grid from '@material-ui/core/Grid'
import Box from '@material-ui/core/Box'

import useGetContactDetailsQuery from '../graphql/get-contract-details'

export default function TrainingDialog() {
  const { data } = useGetContactDetailsQuery()

  const passAmount = data?.payments.filter(p => p.type === 'units').reduce((res, p) => res + p.amount, 0)
  const moneyAmount = data?.payments.filter(p => p.type === 'money').reduce((res, p) => res + p.amount, 0)

  return (
    <Grid item={true}>
      <Box margin='auto' width='fit-content'>
        <Typography variant='h5' color='primary' align='center'>
          Всего поступило
        </Typography>
        {
          moneyAmount! > 0 && (
            <Typography variant='h6' align='center'>
              +{moneyAmount} грн
            </Typography>
          )
        }
        {
          passAmount! > 0 && (
            <Typography variant='h6' align='center'>
              +{passAmount} АБ
            </Typography>
          )
        }
      </Box>
    </Grid>
  )
}
