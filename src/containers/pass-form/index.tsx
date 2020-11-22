import React, { useEffect, useMemo } from 'react'

import { useForm, FormProvider } from 'react-hook-form'

import Button from '@material-ui/core/Button'

import Grid from '@material-ui/core/Grid'
import Box from '@material-ui/core/Box'
import MenuItem from '@material-ui/core/MenuItem'

import FormController from 'containers/fields/form-controller'
import DatePicker from 'containers/fields/date-picker'
import TextInput from 'containers/fields/text-input'
import Select from 'containers/fields/select'
import ClientSuggester from 'containers/fields/client-suggester'

import SaveButton from './save-button'

import { passTypes, getSizes } from 'data/training-passes'

import { IUpdateCacheFn } from 'utils/apollo-cache-updater'
import { requiredValidation } from 'utils/validations'

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
  const methods = useForm<ITrainingPassForm>({
    defaultValues: {
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
  })
  const type = methods.watch('type')
  const size = methods.watch('size')

  const sizes = useMemo(
    () => {
      return getSizes(type)
    }, [type]
  )

  useEffect(
    () => {
      if (size) {
        const s = sizes?.find(s => s.value === size)!

        if (!s) {
          methods.setValue('size', null)
        } else {
          methods.setValue('capacity', s.capacity)
          methods.setValue('price', s.price)
        }
      }
    }, [size, methods, sizes]
  )

  useEffect(
    () => {
      if (type) {
        const passType = passTypes.find(t => t.value === type)!
        methods.setValue('duration', passType.duration)
        methods.setValue('activation', passType.activation)
      }
    }, [type, methods]
  )

  if (!mode) {
    return null
  }

  return (
    <FormProvider {...methods}>
      <>
        <Grid container={true} spacing={3}>
          <Grid item={true} lg={8}>
            <FormController name='contact' rules={requiredValidation}>
              <ClientSuggester
                initialFilter={initialContactFilter}
                rights={['ATTEND']}
                label='Контактное лицо'
                disabled={disabledContact}
              />
            </FormController>
          </Grid>
          <Grid item={true} lg={4}>
            <FormController name='createdAt' rules={requiredValidation}>
              <DatePicker
                label='Дата создания'
                inputVariant='outlined'
                format='D MMMM'
                disabled={true}
                fullWidth={true}
              />
            </FormController>
          </Grid>
          <Grid item={true} lg={8}>
            <FormController name='type' rules={requiredValidation}>
              <Select
                label='Тип абонимента'
                fullWidth={true}
                variant='outlined'
              >
                {
                  passTypes.filter(r => !disabledOpenType || r.value !== 'open').map(r => (
                    <MenuItem value={r.value} key={r.value}>
                      {r.text}
                    </MenuItem>
                  ))
                }
              </Select>
            </FormController>
          </Grid>
          <Grid item={true} lg={4}>
            <FormController name='size' rules={requiredValidation}>
              <Select
                label='Размер'
                fullWidth={true}
                variant='outlined'
              >
                {
                  sizes?.map(size => (
                    <MenuItem value={size.value} key={size.value}>
                      {size.text}
                    </MenuItem>
                  ))
                }
              </Select>
            </FormController>
          </Grid>
          <Grid item={true} lg={6}>
            <FormController name='capacity' rules={requiredValidation}>
              <TextInput
                label='Кол-во АБ'
                fullWidth={true}
                variant='outlined'
                type='number'
                disabled={disabledCapacity}
              />
            </FormController>
          </Grid>
          <Grid item={true} lg={6}>
            <FormController name='price' rules={requiredValidation}>
              <TextInput
                label='Цена'
                fullWidth={true}
                variant='outlined'
                type='number'
                disabled={disabledPrice}
              />
            </FormController>
          </Grid>
          <Grid item={true} lg={6}>
            <FormController name='activation' rules={requiredValidation}>
              <TextInput
                label='Срок активации'
                fullWidth={true}
                variant='outlined'
                type='number'
                disabled={disabledActivation}
              />
            </FormController>
          </Grid>
          <Grid item={true} lg={6}>
            <FormController name='duration' rules={requiredValidation}>
              <TextInput
                label='Срок действия'
                fullWidth={true}
                variant='outlined'
                type='number'
                disabled={disabledDuration}
              />
            </FormController>
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
    </FormProvider>
  )
}
