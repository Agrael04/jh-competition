import React from 'react'
import { IStoreState, useSelector, useActions } from 'store'

import Grid from '@material-ui/core/Grid'
import Box from '@material-ui/core/Box'
import MenuItem from '@material-ui/core/MenuItem'
import Button from '@material-ui/core/Button'

import TextField from 'containers/text-field'
import Select from 'containers/select'

import UserSuggester from './user-suggester'
import ResourceSelect from './resource-select'

import SaveButton from './save-button'

const statuses = ['SCHEDULED', 'BOOKED', 'CONFIRMED', 'CANCELED', 'LATE_CANCELED', 'STARTED', 'FINISHED']

const fieldSelector = (name: any) => (state: IStoreState) => {
  const form: any = state.schedule.trainingDialog.recordForm
  if (form) {
    return form[name]
  }

  return null
}

export default function RecordsBlock() {
  const actions = useActions()
  const isFormActive = useSelector(state => !!state.schedule.trainingDialog.recordForm)

  const handleChange = React.useCallback(
    (name, value) => {
      actions.schedule.trainingDialog.updateRecordField(name, value)
    },
    [actions]
  )

  if (!isFormActive) {
    return null
  }

  return (
    <Grid item={true} lg={8} container={true} spacing={3}>
      <Grid item={true} lg={9}>
        <UserSuggester
          name='contact'
          label='Контактное лицо'
          onChange={handleChange}
          fieldSelector={fieldSelector}
        />
      </Grid>
      <Grid item={true} lg={3} container={true}>
        <Box margin='auto' marginRight={0}>
          <Button color='primary' variant='contained'>
            Расчитать
          </Button>
        </Box>
      </Grid>
      <Grid item={true} lg={5}>
        <UserSuggester
          name='attendant'
          label='Физическое лицо'
          onChange={handleChange}
          fieldSelector={fieldSelector}
        />
      </Grid>
      <Grid item={true} lg={3}>
        <Select
          name='status'
          onChange={handleChange}
          fieldSelector={fieldSelector}
          label={'Статус'}
          fullWidth={true}
          variant='outlined'
        >
          {
            statuses.map(type => (
              <MenuItem value={type} key={type}>
                {type}
              </MenuItem>
            ))
          }
        </Select>
      </Grid>
      <Grid item={true} lg={4}>
        <TextField
          name='note'
          onChange={handleChange}
          fieldSelector={fieldSelector}
          label={'Заметки'}
          fullWidth={true}
          variant='outlined'
        />
      </Grid>
      <Grid item={true} lg={12}>
        <ResourceSelect
          name='resource'
          label='Ресурс'
        />
      </Grid>
      <Grid item={true} lg={12} container={true} justify='space-between'>
        <Button color='primary'>
          Отменить
        </Button>
        <SaveButton />
      </Grid>
    </Grid>
  )
}
