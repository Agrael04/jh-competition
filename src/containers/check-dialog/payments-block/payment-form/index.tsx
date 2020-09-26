import React, { useCallback, useMemo } from 'react'
import moment from 'moment'

import { useActions } from 'store'
import { useForm, FormProvider } from 'react-hook-form'

import Grid from '@material-ui/core/Grid'
import Box from '@material-ui/core/Box'
import Button from '@material-ui/core/Button'
import MenuItem from '@material-ui/core/MenuItem'
import ToggleButton from '@material-ui/lab/ToggleButton'

import SubmitButton from './submit-button'

import FormController from 'containers/fields/form-controller'
import TextInput from 'containers/fields/text-input'
import Select from 'containers/fields/select'
import ToggleGroup from 'containers/fields/toggle-group'

import useGetTrainingPassesQuery from '../../graphql/get-training-passes'
import { paymentDestinations } from '../../data'

import { passTypes, getSizes } from 'data/training-passes'
import { getUsedUnits, getExpirationDate } from 'utils/pass'
import { requiredValidation } from 'utils/validations'

export interface IPaymentForm {
  amount?: number | null
  type?: 'money' | 'units' | null
  pass?: {
    link: string
  }
  destination?: string
  transaction?: string
  createdAt?: Date
  contact?: { link: string }
  gym?: { link: string }
}

interface IProps {
  defaultValues?: IPaymentForm | null
  submit: (form: IPaymentForm) => void
}

export default function PaymentForm({ defaultValues, submit }: IProps) {
  const actions = useActions()
  const { data } = useGetTrainingPassesQuery()
  const methods = useForm<IPaymentForm>({
    defaultValues: defaultValues || {},
  })
  const type = methods.watch('type')

  const triggerOpenPassForm = useCallback(
    () => {
      actions.checkDialog.openPassForm()
    }, [actions]
  )

  const cancel = useCallback(
    () => {
      actions.checkDialog.closePositionForm()
    }, [actions]
  )

  const passes = useMemo(
    () => data?.trainingPasss.map(pass => {
      const type = passTypes.find(p => p.value === pass.type)?.text
      const sizes = getSizes(pass.type)
      const size = sizes?.find(s => s.value === pass.size)?.text
      const capacity = pass.capacity - getUsedUnits(data?.payments, pass)
      const date = moment(getExpirationDate(data?.payments, pass)).format('D MMMM')

      return {
        _id: pass._id,
        label: `${type}${size ? ` ${size}` : ''}, ${capacity} АБ, ${date}`,
      }
    }),
    [data]
  )

  return (
    <FormProvider {...methods}>
      <Grid container={true} spacing={3}>
        <Grid item={true} lg={8} container={true} justify='space-between'>
          <FormController name='amount' rules={requiredValidation}>
            <TextInput
              label='Сумма'
              fullWidth={true}
              variant='outlined'
              type='number'
            />
          </FormController>
        </Grid>
        <Grid item={true} lg={4} container={true} justify='space-between'>
          <Box margin='auto'>
            <FormController name='type' rules={requiredValidation}>
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
        {
          type === 'units' && (
            <>
              <Grid item={true} lg={8}>
                <FormController name='pass' rules={requiredValidation}>
                  <Select
                    label='Абонимент'
                    fullWidth={true}
                    variant='outlined'
                    linked={true}
                  >
                    {
                      passes?.map(pass => (
                        <MenuItem value={pass._id} key={pass._id}>
                          {pass.label}
                        </MenuItem>
                      ))
                    }
                  </Select>
                </FormController>
              </Grid>
              <Grid item={true} lg={4} container={true} justify='flex-end'>
                <Box marginY='auto' marginRight={0}>
                  <Button color='primary' onClick={triggerOpenPassForm}>
                    Добавить
                  </Button>
                </Box>
              </Grid>
            </>
          )
        }
        {
          type === 'money' && (
            <>
              <Grid item={true} lg={12}>
                <FormController name='destination' rules={requiredValidation}>
                  <Select
                    label='Кошелек'
                    fullWidth={true}
                    variant='outlined'
                  >
                    {
                      paymentDestinations.map(destination => (
                        <MenuItem value={destination.value} key={destination.value}>
                          {destination.text}
                        </MenuItem>
                      ))
                    }
                  </Select>
                </FormController>
              </Grid>
              <Grid item={true} lg={12}>
                <FormController name='transaction' rules={requiredValidation}>
                  <TextInput
                    label={'Транзакция'}
                    fullWidth={true}
                    variant='outlined'
                  />
                </FormController>
              </Grid>
            </>
          )
        }
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
