import React from 'react'
import { IStoreState, useSelector, useActions } from 'store'

import Button from '@material-ui/core/Button'

import Grid from '@material-ui/core/Grid'
import Box from '@material-ui/core/Box'

import ContactSuggester from './contract-suggester'
import TypeSelect from './type-select'
import SizeSelect from './size-select'
import CapacityInput from './capacity-input'
import SaveButton from './save-button'

import DatePicker from 'containers/date-picker'

import useGetContactDetailsQuery from '../graphql/get-contact-details'

const selector = (name: any) => (state: IStoreState) => (state.checkDialog.passForm! as any)[name]

export default function PassForm() {
  const actions = useActions()
  const isFormActive = useSelector(state => !!state.checkDialog.passForm)
  const { activeDate, activeGym, contact } = useSelector(state => ({
    activeDate: state.schedule.page.activeDate,
    activeGym: state.schedule.page.activeGym,
    contact: state.checkDialog.contact,
  }))
  const { data } = useGetContactDetailsQuery(activeDate, activeGym, contact)

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
        <Grid item={true} lg={7}>
          <TypeSelect
            name='type'
            label='Тип абонимента'
          />
        </Grid>
        <Grid item={true} lg={5}>
          <SizeSelect
            name='size'
            label='Размер'
          />
        </Grid>
        <Grid item={true} lg={12}>
          <CapacityInput
            name='capacity'
            label='Кол-во АБ'
          />
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
          <DatePicker
            name={'activatedAt'}
            fieldSelector={selector}
            label='Дата активации'
            disabled={true}
            inputVariant='outlined'
          />
        </Grid>
        <Grid item={true} lg={6}>
          <DatePicker
            name={'activatesIn'}
            fieldSelector={selector}
            label='Дата авто-активации'
            disabled={true}
            inputVariant='outlined'
          />
        </Grid>
        <Grid item={true} lg={6}>
          <DatePicker
            name={'expiresIn'}
            fieldSelector={selector}
            label='Дата завершения'
            disabled={true}
            inputVariant='outlined'
          />
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
