import React from 'react'

import IconButton from '@material-ui/core/IconButton'

import Grid from '@material-ui/core/Grid'
import Box from '@material-ui/core/Box'
import MenuItem from '@material-ui/core/MenuItem'

import DeleteIcon from '@material-ui/icons/Delete'

import FormController from 'containers/fields/form-controller'
import Select from 'containers/fields/select'

import times from 'data/times'
import { requiredValidation } from 'utils/validations'

import useGetGymsQuery from '../../queries/get-gyms'

interface IProps {
  index: number
  remove: (index: number) => void
}

export default function TimeframeRow({ index, remove }: IProps) {
  const gyms = useGetGymsQuery()

  const handleRemove = React.useCallback(
    () => remove(index),
    [remove, index]
  )

  return (
    <Grid item={true} lg={12} container={true} spacing={3} justify='center'>
      <Grid item={true} lg={3}>
        <FormController name={`timeFrames[${index}].from`} rules={requiredValidation}>
          <Select
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
        </FormController>
      </Grid>
      <Grid item={true} lg={3}>
        <FormController name={`timeFrames[${index}].to`} rules={requiredValidation}>
          <Select
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
        </FormController>
      </Grid>
      <Grid item={true} lg={5}>
        <FormController name={`timeFrames[${index}].gym`} rules={requiredValidation}>
          <Select
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
        </FormController>
      </Grid>
      <Grid item={true} lg={1}>
        <Box marginY='auto'>
          <IconButton onClick={handleRemove}>
            <DeleteIcon />
          </IconButton>
        </Box>
      </Grid>
    </Grid>
  )
}
