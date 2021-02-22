import { useMemo, useCallback } from 'react'
import { useSelector } from 'store'

import { useFormContext } from 'react-hook-form'

import Box from '@material-ui/core/Box'
import IconButton from '@material-ui/core/IconButton'
import TextField, { TextFieldProps } from '@material-ui/core/TextField'

import AddCircleIcon from '@material-ui/icons/AddCircle'
import RemoveCircleIcon from '@material-ui/icons/RemoveCircle'

import useGetTrainingResourceQuery from '../../queries/get-training-resource'

import times, { MAX_TIME_ID } from 'data/times'

type IProps = TextFieldProps & {
  onChange?: any
  value?: any
  error?: {
    message: string
  }
}

export default function EndTimeSelect(props: IProps) {
  const { value, onChange } = props
  const { watch } = useFormContext()
  const trainingId = useSelector(state => state.ui.pages.schedule.trainingDialog.trainingForm._id)

  const startTime = watch('startTime')
  const resource = watch('resource')?.link

  const { data, loading } = useGetTrainingResourceQuery(value, resource)

  const disabledDecrement = useMemo(
    () => value <= startTime + 1,
    [value, startTime]
  )

  const handleDecrement = useCallback(
    () => {
      onChange(value - 1)
    },
    [value, onChange]
  )

  const disabledIncrement = useMemo(
    () => {
      return (
        loading ||
        (!!data?.newTraining && data?.newTraining._id !== trainingId) ||
        value === MAX_TIME_ID
      )
    },
    [loading, data, trainingId, value]
  )

  const handleIncrement = useCallback(
    () => {
      onChange(value + 1)
    },
    [value, onChange]
  )

  return (
    <TextField
      {...props}
      value={times.find(t => t.id === value)?.label || ''}
      label='Время конца'
      variant='outlined'
      disabled={true}
      fullWidth={true}
      InputProps={{
        endAdornment: (
          <>
            <Box marginY='auto'>
              <IconButton disabled={disabledDecrement} onClick={handleDecrement} size='small'>
                <RemoveCircleIcon color={!disabledDecrement ? 'primary' : undefined} />
              </IconButton>
            </Box>
            <Box marginY='auto'>
              <IconButton disabled={disabledIncrement} onClick={handleIncrement} size='small'>
                <AddCircleIcon color={!disabledIncrement ? 'primary' : undefined} />
              </IconButton>
            </Box>
          </>
        ),
      }}
    />
  )
}
