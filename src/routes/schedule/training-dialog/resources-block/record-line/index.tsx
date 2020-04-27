import React from 'react'
import { IStoreState, useSelector, useActions } from 'store'

import Grid from '@material-ui/core/Grid'
import Box from '@material-ui/core/Box'
import MenuItem from '@material-ui/core/MenuItem'
import IconButton from '@material-ui/core/IconButton'

import ReceiptIcon from '@material-ui/icons/Receipt'

import TextField from 'containers/text-field'
import Select from 'containers/select'

import UserSuggester from './user-suggester'

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
    <Grid item={true} lg={12} container={true} spacing={3}>
      <Grid item={true} lg={3}>
        <UserSuggester
          name='contact'
          label='Контактное лицо'
          onChange={handleChange}
          fieldSelector={fieldSelector}
        />
      </Grid>
      <Grid item={true} lg={3}>
        <UserSuggester
          name='attendant'
          label='Физическое лицо'
          onChange={handleChange}
          fieldSelector={fieldSelector}
        />
      </Grid>
      <Grid item={true} lg={2}>
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
      <Grid item={true} lg={3}>
        <TextField
          name='note'
          onChange={handleChange}
          fieldSelector={fieldSelector}
          label={'Заметки'}
          fullWidth={true}
          variant='outlined'
        />
      </Grid>
      <Grid item={true} lg={1} container={true} justify='flex-end'>
        <Box marginY='auto'>
          <IconButton>
            <ReceiptIcon color='primary' />
          </IconButton>
        </Box>
      </Grid>
    </Grid>
  )
}
