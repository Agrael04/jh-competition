import React, { useMemo, useCallback } from 'react'
import { useForm, FormProvider } from 'react-hook-form'
import { Moment } from 'moment'
import { useSelector, useActions } from 'store'

import Box from '@material-ui/core/Box'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import MenuItem from '@material-ui/core/MenuItem'
import ListSubheader from '@material-ui/core/ListSubheader'

import FormController from 'containers/fields/form-controller'
import Select from 'containers/fields/select'

import DatePicker from './date-picker'
import GymSelect from './gym-select'

import useGetGymsQuery from '../queries/get-gyms'

export interface IFiltersForm {
  date: Moment
  gym: { link: string } | null
  resources: string[]
}

export default function FiltersDialog() {
  const actions = useActions()
  const filters = useSelector(state => state.schedule.page.filters)

  const methods = useForm<IFiltersForm>({
    defaultValues: filters,
  })
  const { handleSubmit, watch } = methods
  const gym = watch('gym')

  const gyms = useGetGymsQuery()

  const resources = useMemo(
    () => {
      return gyms.data?.resources.filter(r => r.gym._id === gym?.link) || []
    },
    [gyms, gym]
  )

  const submit = useCallback(
    (form: any) => {
      actions.schedule.page.completeFilterUpdate(form)
    },
    [actions]
  )

  return (
    <FormProvider {...methods}>
      <Box padding={3}>
        <Grid container={true} spacing={3}>
          <Grid item={true} lg={12}>
            <Typography>
              Фильтры
            </Typography>
          </Grid>
          <Grid item={true} lg={12}>
            <FormController name='date'>
              <DatePicker
                disableToolbar={true}
                inputVariant='outlined'
                fullWidth={true}
              />
            </FormController>
          </Grid>
          <Grid item={true} lg={12}>
            <FormController name='gym'>
              <GymSelect
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
              </GymSelect>
            </FormController>
          </Grid>
          <Grid item={true} lg={12}>
            <FormController name='resources'>
              <Select
                label={'Ресурсы'}
                fullWidth={true}
                variant='outlined'
                multiple={true}
              >
                <ListSubheader>Батуты</ListSubheader>
                {
                  resources.filter(r => r.type === 'trampoline').map(r => (
                    <MenuItem value={r._id} key={r._id}>
                      {r.name}
                    </MenuItem>
                  ))
                }
                <ListSubheader>Другое</ListSubheader>
                {
                  resources.filter(r => r.type === 'other').map(r => (
                    <MenuItem value={r._id} key={r._id}>
                      {r.name}
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
