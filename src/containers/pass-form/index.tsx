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
import PriceInput from './price-input'
import SaveButton from './save-button'

import DatePicker from 'containers/date-picker'

import { IUpdateCacheFn } from 'utils/apollo-cache-updater'

const selector = (name: any) => (state: IStoreState) => (state.passForm.passForm! as any)[name]

interface IProps {
  disabledOpenType?: boolean
  disabledContact?: boolean
  disabledCreatedAt?: boolean
  disabledCapacity?: boolean
  disabledPrice?: boolean
  disabledActivation?: boolean
  disabledDuration?: boolean
  updateCacheOnCreate?: IUpdateCacheFn
  initialContactFilter?: string
}

export default function PassForm({
  disabledOpenType,
  disabledContact,
  disabledCapacity,
  disabledPrice,
  disabledActivation,
  disabledDuration,
  initialContactFilter,
  updateCacheOnCreate,
}: IProps) {
  const actions = useActions()
  const opened = useSelector(state => !!state.passForm.opened)

  const close = actions.passForm.close

  if (!opened) {
    return null
  }

  return (
    <>
      <Grid container={true} spacing={3}>
        <Grid item={true} lg={8}>
          <ContactSuggester
            name={'contact'}
            fieldSelector={selector}
            label='Контактное лицо'
            initialFilter={initialContactFilter}
            disabled={disabledContact}
          />
        </Grid>
        <Grid item={true} lg={4}>
          <DatePicker
            name={'createdAt'}
            fieldSelector={selector}
            label='Дата создания'
            inputVariant='outlined'
            format='D MMMM'
            disabled={true}
            fullWidth={true}
          />
        </Grid>
        <Grid item={true} lg={8}>
          <TypeSelect disabledOpenType={disabledOpenType} />
        </Grid>
        <Grid item={true} lg={4}>
          <SizeSelect
            name='size'
            label='Размер'
          />
        </Grid>
        <Grid item={true} lg={6}>
          <CapacityInput disabled={disabledCapacity} />
        </Grid>
        <Grid item={true} lg={6}>
          <PriceInput disabled={disabledPrice} />
        </Grid>
        <Grid item={true} lg={6}>
          <ActivationInput disabled={disabledActivation} />
        </Grid>
        <Grid item={true} lg={6}>
          <DurationInput disabled={disabledDuration} />
        </Grid>
      </Grid>
      <Box marginTop={2}>
        <Grid container={true} justify='space-between'>
          <Button onClick={close} color='primary'>
            Отменить
          </Button>
          <SaveButton updateCacheOnCreate={updateCacheOnCreate} />
        </Grid>
      </Box>
    </>
  )
}
