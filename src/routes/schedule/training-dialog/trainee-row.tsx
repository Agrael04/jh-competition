import React from 'react'
import { IStoreState, useActions } from 'store'

import IconButton from '@material-ui/core/IconButton'

import Grid from '@material-ui/core/Grid'
import Box from '@material-ui/core/Box'
import MenuItem from '@material-ui/core/MenuItem'

import DeleteIcon from '@material-ui/icons/Delete'

import TextField from 'containers/text-field'
import Select from 'containers/select'

import TraineeSuggester from './trainee-suggester'

const statuses = ['SCHEDULED', 'BOOKED', 'CONFIRMED', 'CANCELED', 'LATE_CANCELED', 'STARTED', 'FINISHED']

type FieldName = keyof IStoreState['schedule']['trainingDialog']['recordsForm'][0]

export default function TraineeRow({ index }: { index: number }) {
  const fieldSelector = React.useCallback(
    (name: FieldName) => (state: IStoreState) => {
      const trainee = state.schedule.trainingDialog.recordsForm.find((item, id) => id === index)
      return trainee ? trainee[name] : trainee
    },
    [index]
  )

  const actions = useActions()

  const removeTrainee = React.useCallback(
    () => actions.schedule.trainingDialog.removeRecord(index),
    [actions, index]
  )

  const handleChange = (name: string, value: any) => {
    actions.schedule.trainingDialog.updateRecordField(index, name, value)
  }

  return (
    <Grid item={true} lg={12}>
      <Box marginX={1} border={1} borderRadius={5} padding={1} borderColor='text.disabled'>
        <Grid container={true} spacing={2}>
          <Grid item={true} lg={3}>
            <TraineeSuggester
              name='trainee'
              label='Поиск клиента'
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
          <Grid item={true} lg={2}>
            <TextField
              name='seasonPass'
              onChange={handleChange}
              fieldSelector={fieldSelector}
              label={'Абонимент'}
              fullWidth={true}
              variant='outlined'
            />
          </Grid>
          <Grid item={true} lg={2}>
            <TextField
              name='moneyPrice'
              onChange={handleChange}
              fieldSelector={fieldSelector}
              label={'Разовая цена'}
              fullWidth={true}
              variant='outlined'
            />
          </Grid>
          <Grid item={true} lg={2}>
            <TextField
              name='marksPrice'
              onChange={handleChange}
              fieldSelector={fieldSelector}
              label={'Количество отметок'}
              fullWidth={true}
              variant='outlined'
            />
          </Grid>
          <Grid item={true} lg={1} container={true} justify='flex-end'>
            <Box marginY='auto'>
              <IconButton onClick={removeTrainee}>
                <DeleteIcon />
              </IconButton>
            </Box>
          </Grid>
          <Grid item={true} lg={3}>
            <TraineeSuggester
              name='trainee'
              label='Поиск посетителя'
              onChange={handleChange}
              fieldSelector={fieldSelector}
            />
          </Grid>
          <Grid item={true} lg={9}>
            <TextField
              name='note'
              onChange={handleChange}
              fieldSelector={fieldSelector}
              label={'Заметки'}
              fullWidth={true}
              variant='outlined'
            />
          </Grid>
        </Grid>
      </Box>
    </Grid>
  )
}
