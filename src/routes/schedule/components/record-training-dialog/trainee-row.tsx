import React from 'react'
import { IStoreState, useActions } from '../../../../store'

import IconButton from '@material-ui/core/IconButton'

import Grid from '@material-ui/core/Grid'
import Box from '@material-ui/core/Box'
import MenuItem from '@material-ui/core/MenuItem'

import DeleteIcon from '@material-ui/icons/Delete'

import TextField from '../../../../containers/text-field'
import Select from '../../../../containers/select'

type FieldName = keyof IStoreState['schedule']['recordForm']['trainees'][0]

export default function TraineeRow({ index }: { index: number }) {
  const fieldSelector = React.useCallback(
    (name: FieldName) => (state: IStoreState) => {
      const trainee = state.schedule.recordForm.trainees.find((item, id) => id === index)
      return trainee ? trainee[name] : trainee
    },
    [index]
  )

  const actions = useActions()

  const removeTrainee = () => actions.schedule.removeTrainee(index)

  const handleChange = (name: string, value: any) => {
    actions.schedule.updateTraineeFormField(index, name, value)
  }

  return (
    <Grid item={true} lg={12}>
      <Box marginX={1} border={1} borderRadius={5} padding={1} borderColor='text.disabled'>
        <Grid container={true} spacing={2}>
          <Grid item={true} lg={3}>
            <TextField
              name='name'
              onChange={handleChange}
              fieldSelector={fieldSelector}
              label={'Name'}
              fullWidth={true}
              variant='outlined'
            />
          </Grid>
          <Grid item={true} lg={2}>
            <TextField
              name='seasonPass'
              onChange={handleChange}
              fieldSelector={fieldSelector}
              label={'Abonement'}
              fullWidth={true}
              variant='outlined'
            />
          </Grid>
          <Grid item={true} lg={2}>
            <Select
              name='status'
              onChange={handleChange}
              fieldSelector={fieldSelector}
              label={'Status'}
              fullWidth={true}
              variant='outlined'
            >
              {
                ['RESERVED', 'PENDING', 'CONFIRMED'].map(type => (
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
              label={'Notes'}
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
        </Grid>
      </Box>
    </Grid>
  )
}
