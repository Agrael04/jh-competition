import React from 'react'
import { IStoreState, useActions } from 'store'

import IconButton from '@material-ui/core/IconButton'

import Grid from '@material-ui/core/Grid'
import Box from '@material-ui/core/Box'
import MenuItem from '@material-ui/core/MenuItem'

import DeleteIcon from '@material-ui/icons/Delete'

import Select from 'containers/select'
import times from 'data/times'

import useGetGymsQuery from '../queries/get-gyms'

type FieldName = keyof IStoreState['schedule']['addTrainerDialog']['timeFrames'][0]

export default function TimeframeRow({ index }: { index: number }) {
  const gyms = useGetGymsQuery()

  const fieldSelector = React.useCallback(
    (name: FieldName) => (state: IStoreState) => {
      const tf = state.schedule.addTrainerDialog.timeFrames.find((item, id) => id === index)
      return tf ? tf[name] : tf
    },
    [index]
  )

  const actions = useActions()

  const remove = React.useCallback(
    () => actions.schedule.addTrainerDialog.removeTimeFrame(index),
    [actions, index]
  )

  const handleChange = (name: string, value: any) => {
    actions.schedule.addTrainerDialog.updateTimeframeField(index, name, value)
  }

  return (
    <Grid item={true} lg={12} container={true} spacing={3} justify='center'>
      <Grid item={true} lg={3}>
        <Select
          name='from'
          onChange={handleChange}
          fieldSelector={fieldSelector}
          label={'Начало'}
          fullWidth={true}
          variant='outlined'
        >
          {
            times.map(time => (
              <MenuItem value={time.id} key={time.id}>
                {time.label}
              </MenuItem>
            ))
          }
        </Select>
      </Grid>
      <Grid item={true} lg={3}>
        <Select
          name='to'
          onChange={handleChange}
          fieldSelector={fieldSelector}
          label={'Конец'}
          fullWidth={true}
          variant='outlined'
        >
          {
            times.map(time => (
              <MenuItem value={time.id} key={time.id}>
                {time.label}
              </MenuItem>
            ))
          }
        </Select>
      </Grid>
      <Grid item={true} lg={5}>
        <Select
          name='gym'
          onChange={handleChange}
          fieldSelector={fieldSelector}
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
      </Grid>
      <Grid item={true} lg={1}>
        <Box marginY='auto'>
          <IconButton onClick={remove}>
            <DeleteIcon />
          </IconButton>
        </Box>
      </Grid>
    </Grid>
  )
}
