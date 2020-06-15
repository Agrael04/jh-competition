import React from 'react'

import Grid from '@material-ui/core/Grid'
import Box from '@material-ui/core/Box'

import TypeSelect from './type-select'
import ServiceSelect from './service-select'
import AddPassButton from './add-pass-button'
import PriceAmount from './price-amount'
import CancelButton from './cancel-button'
import SaveButton from './save-button'

export default function ServiceForm() {
  return (
    <>
      <Grid container={true} spacing={3}>
        <Grid item={true} lg={12}>
          <TypeSelect />
        </Grid>

        <Grid item={true} lg={8}>
          <ServiceSelect />
        </Grid>

        <Grid item={true} lg={4} container={true} justify='flex-end'>
          <AddPassButton />
        </Grid>

        <Grid item={true} lg={12}>
          <PriceAmount />
        </Grid>
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
