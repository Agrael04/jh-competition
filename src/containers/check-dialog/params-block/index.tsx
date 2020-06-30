import React from 'react'

import Grid from '@material-ui/core/Grid'

import GymSelect from './gym-select'
import DatePicker from './date-picker'
import ContactSuggester from './contact-suggester'

export default function ParamsBlock() {
  return (
    <>
      <Grid item={true} lg={4}>
        <GymSelect />
      </Grid>
      <Grid item={true} lg={4}>
        <DatePicker />
      </Grid>
      <Grid item={true} lg={4}>
        <ContactSuggester label='Контактное лицо' />
      </Grid>
    </>
  )
}
