import React from 'react'
import { IStoreState, useSelector, useActions } from 'store'

import Button from '@material-ui/core/Button'

import Grid from '@material-ui/core/Grid'
import Box from '@material-ui/core/Box'

import ContactSuggester from './contact-suggester'
import TypeSelect from './type-select'
import SizeSelect from './size-select'
import ActivationInput from './activation-input'
import CapacityInput from './capacity-input'
import DurationInput from './duration-input'
import SaveButton from './save-button'

import DatePicker from 'containers/date-picker'

import useGetContactDetailsQuery from '../graphql/get-contract-details'

const selector = (name: any) => (state: IStoreState) => (state.checkDialog.passForm! as any)[name]

export default function PassForm() {
  const actions = useActions()
  const isFormActive = useSelector(state => !!state.checkDialog.passForm)
  const { data } = useGetContactDetailsQuery()

  const close = actions.checkDialog.resetPass

  if (!isFormActive) {
    return null
  }

  return (
    <>
      <Grid container={true} spacing={3}>
        <Grid item={true} lg={12}>
          <ContactSuggester
            name={'contract'}
            fieldSelector={selector}
            label='Контактное лицо'
            initialFilter={data?.user.fullName}
            disabled={true}
          />
        </Grid>
        <Grid item={true} lg={6}>
          <TypeSelect
            name='type'
            label='Тип абонимента'
          />
        </Grid>
        <Grid item={true} lg={6}>
          <SizeSelect
            name='size'
            label='Размер'
          />
        </Grid>
        <Grid item={true} lg={6}>
          <CapacityInput />
        </Grid>
        <Grid item={true} lg={6}>
          <DurationInput />
        </Grid>
        <Grid item={true} lg={6}>
          <DatePicker
            name={'createdAt'}
            fieldSelector={selector}
            label='Дата создания'
            disabled={true}
            inputVariant='outlined'
          />
        </Grid>
        <Grid item={true} lg={6}>
          <ActivationInput />
        </Grid>
      </Grid>
      <Box marginTop={2}>
        <Grid container={true} justify='space-between'>
          <Button onClick={close} color='primary'>
            Отменить
          </Button>
          <SaveButton />
        </Grid>
      </Box>
    </>
  )
}
