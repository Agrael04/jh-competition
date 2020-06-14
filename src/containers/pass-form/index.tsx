import React from 'react'

import Button from '@material-ui/core/Button'

import Grid from '@material-ui/core/Grid'
import Box from '@material-ui/core/Box'

import { Provider } from './context'

import ContactSuggester from './contact-suggester'
import CreatedAtPicker from './created-at-picker'
import TypeSelect from './type-select'
import SizeSelect from './size-select'
import NumberInput from './number-input'
import SaveButton from './save-button'

import { IUpdateCacheFn } from 'utils/apollo-cache-updater'

import { ITrainingPassForm } from 'interfaces/training-pass'

interface IProps {
  mode: 'create' | 'update' | null
  initialForm: Partial<ITrainingPassForm> | null
  close: () => void

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
  mode,
  initialForm,
  close,

  disabledOpenType,
  disabledContact,
  disabledCapacity,
  disabledPrice,
  disabledActivation,
  disabledDuration,
  initialContactFilter,
  updateCacheOnCreate,
}: IProps) {
  const initialState = {
    passForm: {
      _id: initialForm?._id,
      contact: initialForm?.contact || null,
      type: initialForm?.type || null,
      size: initialForm?.size || null,
      capacity: initialForm?.capacity || null,
      duration: initialForm?.duration || null,
      activation: initialForm?.activation || null,
      price: initialForm?.price || null,
      isActive: initialForm?.isActive || null,
      createdAt: initialForm?.createdAt || null,
    },
  }

  if (!mode) {
    return null
  }

  return (
    <Provider initialState={initialState}>
      <>
        <Grid container={true} spacing={3}>
          <Grid item={true} lg={8}>
            <ContactSuggester
              label='Контактное лицо'
              initialFilter={initialContactFilter}
              disabled={disabledContact}
            />
          </Grid>
          <Grid item={true} lg={4}>
            <CreatedAtPicker />
          </Grid>
          <Grid item={true} lg={8}>
            <TypeSelect disabledOpenType={disabledOpenType} />
          </Grid>
          <Grid item={true} lg={4}>
            <SizeSelect />
          </Grid>
          <Grid item={true} lg={6}>
            <NumberInput name='capacity' disabled={disabledCapacity} label='Кол-во АБ' />
          </Grid>
          <Grid item={true} lg={6}>
            <NumberInput name='price' disabled={disabledPrice} label='Цена' />
          </Grid>
          <Grid item={true} lg={6}>
            <NumberInput name='activation' disabled={disabledActivation} label='Срок активации' />
          </Grid>
          <Grid item={true} lg={6}>
            <NumberInput name='duration' disabled={disabledDuration} label='Срок действия' />
          </Grid>
        </Grid>
        <Box marginTop={2}>
          <Grid container={true} justify='space-between'>
            <Button onClick={close} color='primary'>
              Отменить
            </Button>
            <SaveButton updateCacheOnCreate={updateCacheOnCreate} mode={mode} close={close} />
          </Grid>
        </Box>
      </>
    </Provider>
  )
}
