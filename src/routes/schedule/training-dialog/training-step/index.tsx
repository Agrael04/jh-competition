import React from 'react'
import { IStoreState, useSelector, useActions } from 'store'

import Grid from '@material-ui/core/Grid'
import Box from '@material-ui/core/Box'
import MenuItem from '@material-ui/core/MenuItem'

import TextField from 'containers/deprecated/text-field'
import DatePicker from 'containers/deprecated/date-picker'
import Select from 'containers/deprecated/select'

import GymSelect from './gym-select'

import SubmitUpdateButton from './submit-update-button'
import DeleteButton from './delete-button'

import useGetTrainingQuery, { convertTrainingToInput } from '../../queries/get-training'

import { trainingTypes } from 'data/training-types'

type FieldName = keyof IStoreState['schedule']['trainingDialog']['trainingForm']

const fieldSelector = (name: FieldName) => (state: IStoreState) => state.schedule.trainingDialog.trainingForm[name]

export default function TrainingDialog() {
  const _id = useSelector(state => state.schedule.trainingDialog._id)

  const trainingQuery = useGetTrainingQuery(_id!)

  const actions = useActions()

  const handleChange = React.useCallback(
    (name: string, value: any) => {
      let v = value
      if (name === 'markPrice' || name === 'moneyPrice') {
        v = Number(value)
      }

      if (typeof v === 'object') {
        v = v.toDate()
      }

      actions.schedule.trainingDialog.updateField(name, v)
    },
    [actions]
  )

  React.useEffect(
    () => {
      if (trainingQuery.data?.training) {
        const training = convertTrainingToInput(trainingQuery.data.training)

        actions.schedule.trainingDialog.initialize(training)
      }
    }, [actions, trainingQuery, _id]
  )

  return (
    <>
      <Grid item={true} container={true} lg={4} spacing={2}>
        <Grid item={true} lg={12}>
          <GymSelect
            name='gym'
            label='Зал'
          />
          <Box marginBottom={2.5} />
        </Grid>
        <Grid item={true} lg={12}>
          <DatePicker
            name='date'
            onChange={handleChange}
            fieldSelector={fieldSelector}
            label='Дата'
            fullWidth={true}
            inputVariant='outlined'
            disableToolbar={true}
            variant='inline'
            disabled={true}
          />
        </Grid>
      </Grid>
      <Grid item={true} container={true} lg={4} spacing={2}>
        <Grid item={true} lg={12}>
          <TextField
            name='name'
            onChange={handleChange}
            fieldSelector={fieldSelector}
            label='Название'
            fullWidth={true}
            variant='outlined'
          />
          <Box marginBottom={2.5} />
        </Grid>
        <Grid item={true} lg={8}>
          <Select
            name='type'
            onChange={handleChange}
            fieldSelector={fieldSelector}
            label={'Тип треннировки'}
            fullWidth={true}
            variant='outlined'
          >
            {
              trainingTypes.map(type => (
                <MenuItem value={type.id} key={type.id}>
                  {type.text}
                </MenuItem>
              ))
            }
          </Select>
        </Grid>
        <Grid item={true} lg={4}>
          <TextField
            name='traineesAmount'
            onChange={handleChange}
            fieldSelector={fieldSelector}
            label={'Кол-во'}
            fullWidth={true}
            variant='outlined'
            type='number'
          />
        </Grid>
      </Grid>
      <Grid item={true} container={true} lg={4} spacing={2}>
        <Grid item={true} lg={12}>
          <TextField
            name='note'
            onChange={handleChange}
            fieldSelector={fieldSelector}
            label='Комментарий'
            rows={6}
            fullWidth={true}
            variant='outlined'
            multiline={true}
          />
        </Grid>
      </Grid>
      {
        trainingQuery.data?.training && (
          <Grid item={true} lg={12} container={true} justify='space-between'>
            <DeleteButton />
            <SubmitUpdateButton />
          </Grid>
        )
      }
    </>
  )
}
