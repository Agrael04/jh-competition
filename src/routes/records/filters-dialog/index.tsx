import React from 'react'
import { useForm, FormProvider } from 'react-hook-form'
import { Moment } from 'moment'
import { useSelector, useActions } from 'store'

import Box from '@material-ui/core/Box'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'

import FormController from 'components/form-controller'

import GymSelect from './gym-select'
import TrainerSelect from './trainer-select'
import TypeSelect from './type-select'
import DatePicker from './date-picker'

interface IForm {
  date: Moment
  gym?: string
  trainer?: string
  types: string[]
}

export default function FiltersDialog() {
  const actions = useActions()
  const filters = useSelector(state => state.records.page.filters)

  const methods = useForm<IForm>({
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
            <FormController
              name='date'
              Component={DatePicker}
              rules={{ required: true }}
            />
          </Grid>
          <Grid item={true} lg={12}>
            <FormController
              name='gym'
              Component={GymSelect}
            />
          </Grid>
          <Grid item={true} lg={12}>
            <FormController
              name='trainer'
              Component={TrainerSelect}
            />
          </Grid>
          <Grid item={true} lg={12}>
            <FormController
              name='types'
              Component={TypeSelect}
            />
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
