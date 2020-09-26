import React, { useCallback, useEffect } from 'react'

import { useActions } from 'store'
import { useForm, FormProvider } from 'react-hook-form'

import Grid from '@material-ui/core/Grid'
import Box from '@material-ui/core/Box'
import Button from '@material-ui/core/Button'
import MenuItem from '@material-ui/core/MenuItem'
import ToggleButton from '@material-ui/lab/ToggleButton'

import FormController from 'containers/fields/form-controller'
import TextInput from 'containers/fields/text-input'
import Select from 'containers/fields/select'
import ToggleGroup from 'containers/fields/toggle-group'

import SubmitButton from './submit-button'

import { requiredValidation } from 'utils/validations'
import { products } from '../../data'
import { passTypes, getSizes } from 'data/training-passes'

export interface IPositionForm {
  type?: string
  service?: string
  priceAmount?: number | null
  priceType?: 'money' | 'units' | null
}

interface IProps {
  defaultValues?: IPositionForm | null
  submit: (form: IPositionForm) => void
}

export default function PositionForm({ defaultValues, submit }: IProps) {
  const actions = useActions()
  const methods = useForm<IPositionForm>({
    defaultValues: defaultValues || {},
  })
  const type = methods.watch('type')
  const service = methods.watch('service')

  const triggerOpenPassForm = useCallback(
    () => {
      if (type !== 'pass') {
        return
      }
      const p: any = products.find(p => p.id === 'pass')?.options.find(o => o.id === service)!

      if (!p || p.type === 'open') {
        actions.checkDialog.openPassForm()
        return
      }

      const passType = passTypes.find(t => t.value === p.type)!
      const passSize = getSizes(p.type)!.find(s => s.value === p.size)!

      actions.checkDialog.openPassForm({
        type: p.type,
        size: p.size,
        duration: passType.duration,
        activation: passType.activation,
        capacity: passSize.capacity,
        price: passSize.price,
      })
    }, [actions, type, service]
  )

  const cancel = useCallback(
    () => {
      actions.checkDialog.closePositionForm()
    }, [actions]
  )

  const product = products.find(p => p.id === type)

  useEffect(
    () => {
      if (type !== 'training') {
        methods.setValue('priceType', 'money')
      }
    }, [methods, type]
  )

  return (
    <FormProvider {...methods}>
      <Grid container={true} spacing={3}>
        <Grid item={true} lg={12}>
          <FormController name='type' rules={requiredValidation}>
            <Select
              label='Тип услуги'
              fullWidth={true}
              variant='outlined'
            >
              {
                products.map(product => (
                  <MenuItem value={product.id} key={product.id}>
                    {product.name}
                  </MenuItem>
                ))
              }
            </Select>
          </FormController>
        </Grid>

        <Grid item={true} lg={8}>
          <FormController name='service' rules={requiredValidation}>
            <Select
              label='Тип услуги'
              fullWidth={true}
              variant='outlined'
            >
              {
                (product?.options || []).map(service => (
                  <MenuItem value={service.id} key={service.id}>
                    {service.name}
                  </MenuItem>
                ))
              }
            </Select>
          </FormController>
        </Grid>

        {
          type === 'pass' && (
            <Grid item={true} lg={4} container={true} justify='flex-end'>
              <Box marginY='auto' marginRight={0}>
                <Button color='primary' onClick={triggerOpenPassForm}>
                  Добавить
                </Button>
              </Box>
            </Grid>
          )
        }

        <Grid item={true} lg={8}>
          <FormController name='priceAmount' rules={requiredValidation}>
            <TextInput
              label='Цена'
              fullWidth={true}
              variant='outlined'
              type='number'
            />
          </FormController>
        </Grid>
        <Grid item={true} lg={4} container={true}>
          <Box margin='auto'>
            <FormController name='priceType' rules={requiredValidation}>
              <ToggleGroup exclusive={true}>
                <ToggleButton value='money'>
                  Грн
                </ToggleButton>
                <ToggleButton value='units'>
                  АБ
                </ToggleButton>
              </ToggleGroup>
            </FormController>
          </Box>
        </Grid>
      </Grid>
      <Box marginTop={2}>
        <Grid container={true} justify='space-between'>
          <Button onClick={cancel} color='primary'>
            Отменить
          </Button>
          <SubmitButton submit={submit} />
        </Grid>
      </Box>
    </FormProvider>
  )
}
