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
import DatePicker from 'containers/fields/date-picker'
import Checkbox from 'containers/fields/checkbox'
import Select from 'containers/fields/select'

import { ages } from './data'

export interface IFiltersForm {
  visitedAt: Moment | null
  withDebt: boolean
  age: string | null
}

export default function FiltersDialog() {
  const actions = useActions()
  const filters = useSelector(state => state.clients.page.filters)

  const methods = useForm<IFiltersForm>({
    defaultValues: filters,
  })
  const { handleSubmit } = methods

  const submit = React.useCallback(
    (form: IFiltersForm) => {
      actions.clients.page.completeFilterUpdate(form)
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
            <FormController name='visitedAt'>
              <DatePicker
                disableToolbar={true}
                inputVariant='outlined'
                fullWidth={true}
                format='MMMM YYYY'
                label='Месяц последнего посещения'
                views={['month', 'year']}
                clearable={true}
              />
            </FormController>
          </Grid>
          <Grid item={true} lg={12}>
            <FormController name='withDebt'>
              <Checkbox
                label='C долгом'
              />
            </FormController>
          </Grid>
          <Grid item={true} lg={12}>
            <FormController name='age'>
              <Select
                label='Возраст'
                fullWidth={true}
                variant='outlined'
              >
                {
                  ages.map(age => (
                    <MenuItem value={age} key={age}>
                      {age}
                    </MenuItem>
                  ))
                }
              </Select>
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
