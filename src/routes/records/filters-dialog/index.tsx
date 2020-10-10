import React from 'react'
import { useForm, FormProvider } from 'react-hook-form'
import { Moment } from 'moment'
import { useSelector, useActions } from 'store'

import Box from '@material-ui/core/Box'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import MenuItem from '@material-ui/core/MenuItem'

import FormController from 'containers/fields/form-controller'
import Select from 'containers/fields/select'
import DatePicker from 'containers/fields/date-picker'

import TypeSelect from './type-select'

import useGetGymsQuery from '../graphql/get-gyms'
import useGetTrainersQuery from '../graphql/get-trainers'

export interface IFiltersForm {
  date: Moment
  gym?: string
  trainer?: string
  types: string[]
}

export default function FiltersDialog() {
  const actions = useActions()
  const filters = useSelector(state => state.records.page.filters)

  const gyms = useGetGymsQuery()
  const trainers = useGetTrainersQuery()

  const methods = useForm<IFiltersForm>({
    defaultValues: filters,
  })
  const { handleSubmit } = methods

  const submit = React.useCallback(
    (form: any) => {
      actions.records.page.completeFilterUpdate(form)
    },
    [actions]
  )

  return (
    <FormProvider {...methods}>
      <Box padding={3}>
        <Grid container={true} spacing={3}>
          <Grid item={true} lg={12}>
            <Typography>
              Фильтры записей
            </Typography>
          </Grid>
          <Grid item={true} lg={12}>
            <FormController name='date' rules={{ required: true }}>
              <DatePicker
                disableToolbar={true}
                inputVariant='outlined'
                fullWidth={true}
                format='MMMM YYYY'
                label='Месяц'
                views={['month', 'year']}
                clearable={true}
              />
            </FormController>
          </Grid>
          <Grid item={true} lg={12}>
            <FormController name='gym'>
              <Select
                label={'Зал'}
                fullWidth={true}
                variant='outlined'
              >
                {
                  gyms.data?.gyms.map(gym => (
                    <MenuItem value={gym._id} key={gym._id}>
                      {gym.name}
                    </MenuItem>
                  ))
                }
              </Select>
            </FormController>
          </Grid>
          <Grid item={true} lg={12}>
            <FormController name='trainer'>
              <Select
                label={'Тренер'}
                fullWidth={true}
                variant='outlined'
              >
                {
                  trainers.data?.trainers.map(trainer => (
                    <MenuItem value={trainer._id} key={trainer._id}>
                      {trainer.lastName} {trainer.firstName}
                    </MenuItem>
                  ))
                }
              </Select>
            </FormController>
          </Grid>
          <Grid item={true} lg={12}>
            <FormController name='types'>
              <TypeSelect />
            </FormController>
          </Grid>
          <Grid item={true} lg={12}>
            <Grid container={true} justify='flex-end'>
              <Button color='primary' variant='contained' onClick={handleSubmit(submit)}>
                Обновить
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Box>
    </FormProvider>
  )
}
