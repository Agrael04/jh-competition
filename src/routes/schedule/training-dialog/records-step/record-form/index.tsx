import React from 'react'
import { IStoreState, useSelector, useActions } from 'store'

import Grid from '@material-ui/core/Grid'
import Box from '@material-ui/core/Box'
import MenuItem from '@material-ui/core/MenuItem'
import Button from '@material-ui/core/Button'

import TextField from 'containers/text-field'
import Select from 'containers/select'

import useGetTrainingQuery from '../../../queries/get-training'

import UserSuggester from './user-suggester'
import ResourceSelect from './resource-select'
import ContactAbornment from './contact-abornment'

import SaveButton from './save-button'

const statuses = ['ONLINE_BOOKED', 'SCHEDULED', 'BOOKED', 'CONFIRMED', 'CANCELED', 'LATE_CANCELED', 'STARTED', 'FINISHED']

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
  const { _id, recordId } = useSelector(state => ({
    _id: state.schedule.trainingDialog._id,
    recordId: state.schedule.trainingDialog.recordForm?._id,
  }))
  const trainingQuery = useGetTrainingQuery(_id)

  const handleChange = React.useCallback(
    (name, value) => {
      actions.schedule.trainingDialog.updateRecordField(name, value)
    },
    [actions]
  )

  const handleContractChange = React.useCallback(
    (name, value) => {
      actions.schedule.trainingDialog.updateRecord({
        contact: value,
        attendant: value,
      })
    },
    [actions]
  )

  const resetRecord = actions.schedule.trainingDialog.resetRecord
  const openCheckDialog = actions.schedule.trainingDialog.openCheckDialog

  const record = React.useMemo(
    () => {
      return trainingQuery.data?.trainingRecords.find(tr => tr._id === recordId)
    }, [trainingQuery, recordId]
  )

  if (!isFormActive) {
    return null
  }

  return (
    <Grid item={true} lg={8} container={true} spacing={4}>
      <Grid item={true} lg={9}>
        <UserSuggester
          name='contact'
          label='Контактное лицо'
          onChange={handleContractChange}
          fieldSelector={fieldSelector}
          initialFilter={record?.contact?.fullName}
          startAdornment={<ContactAbornment />}
        />
      </Grid>
      <Grid item={true} lg={3} container={true}>
        <Box margin='auto' marginRight={0}>
          <Button color='primary' variant='contained' onClick={openCheckDialog}>
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
          initialFilter={record?.attendant?.fullName}
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
        <Button color='primary' onClick={resetRecord}>
          Отменить
        </Button>
        <SaveButton />
      </Grid>
    </Grid>
  )
}
