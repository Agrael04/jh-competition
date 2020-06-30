import React from 'react'

import Dialog from '@material-ui/core/Dialog'

import Grid from '@material-ui/core/Grid'
import Box from '@material-ui/core/Box'
import CircularProgress from '@material-ui/core/CircularProgress'

import Header from './header'
import ParamsBlock from './params-block'
import PassForm from './pass-form'
import PaymentsBlock from './payments-block'
import RecordsBlock from './records-block'
import TotalBlock from './total-block'

import useGetContactDetails from './graphql/get-contact-details'

export default function CheckDialog() {
  const { loading } = useGetContactDetails()

  return (
    <Dialog open={true} maxWidth='lg' fullWidth={true}>
      <Header />
      <Box padding={3}>
        <Grid container={true} spacing={3}>
          <ParamsBlock />
          <Grid item={true} lg={12}>
            <Box border={1} borderColor='primary.main' width={1} />
          </Grid>

          {
            !loading ? (
              <>
                <Grid item={true} lg={4} container={true} justify='space-between' direction='column'>
                  <RecordsBlock />
                </Grid>
                <Grid item={true} lg={4} container={true} justify='space-between' direction='column'>
                  <PaymentsBlock />
                </Grid>
                <Grid item={true} lg={4}>
                  <PassForm />
                </Grid>
                <Grid item={true} lg={12}>
                  <Box border={1} borderColor='primary.main' width={1} />
                </Grid>
                <TotalBlock />
              </>
            ) : (
                <Grid container={true}>
                  <Box margin='auto'>
                    <CircularProgress />
                  </Box>
                </Grid>
              )
          }
        </Grid>
      </Box>
    </Dialog>
  )
}
