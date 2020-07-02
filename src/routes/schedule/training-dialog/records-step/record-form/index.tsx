import React from 'react'
import { IStoreState, useSelector, useActions } from 'store'

import Grid from '@material-ui/core/Grid'
import Box from '@material-ui/core/Box'
import MenuItem from '@material-ui/core/MenuItem'
import Button from '@material-ui/core/Button'

import TextField from 'containers/text-field'
import Select from 'containers/select'

import ContactSuggester from './contact-suggester'
import AttendantSuggester from './attendant-suggester'
import ResourceSelect from './resource-select'

import SaveButton from './save-button'

const statuses = ['ONLINE_BOOKED', 'SCHEDULED', 'BOOKED', 'CONFIRMED', 'CANCELED', 'LATE_CANCELED', 'STARTED', 'FINISHED', 'CLOSED', 'CLOSED_DEBT']

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
      actions.schedule.trainingDialog.updateRecord({ [name]: value })
    },
    [actions]
  )

  const resetRecord = actions.schedule.trainingDialog.resetRecord
  const openCheckDialog = actions.schedule.trainingDialog.openCheckDialog

  if (!isFormActive) {
    return null
  }

  return (
    <Grid item={true} lg={8} container={true} spacing={4}>
      <Grid item={true} lg={9}>
        <ContactSuggester />
      </Grid>
      <Grid item={true} lg={3} container={true}>
        <Box margin='auto' marginRight={0}>
          <Button color='primary' variant='contained' onClick={openCheckDialog}>
            Расчитать
          </Button>
        </Box>
      </Grid>
      <Grid item={true} lg={5}>
        <AttendantSuggester />
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
        <Button color='primary' onClick={resetRecord}>
          Отменить
        </Button>
        <SaveButton />
      </Grid>
    </Grid>
  )
}
