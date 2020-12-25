import { useSelector } from 'store'
import { createSelector } from 'reselect'
import { useForm, FormProvider } from 'react-hook-form'

import Grid from '@material-ui/core/Grid'
import Box from '@material-ui/core/Box'
import MenuItem from '@material-ui/core/MenuItem'

import FormController from 'containers/fields/form-controller'
import DatePicker from 'containers/fields/date-picker'
import TextInput from 'containers/fields/text-input'
import Select from 'containers/fields/select'

import { trainingTypes } from 'data/training-types'
import { requiredValidation } from 'utils/validations'

import { selectState, selectTrainingId } from 'store/ui/pages/schedule/training-dialog/selectors'

import SubmitButton from './submit-button'
import DeleteButton from './delete-button'

import useGetGymsQuery from '../../../queries/get-gyms'
import useGetTrainingQuery from '../../../queries/get-training'

import ITrainingForm from './form'

const selectProps = createSelector(
  selectState,
  selectTrainingId,
  (state, _id) => ({
    defaultValues: state.trainingForm.defaultValues,
    _id,
  })
)

export default function TrainingForm() {
  const { defaultValues, _id } = useSelector(selectProps)

  const methods = useForm<ITrainingForm>({
    defaultValues,
  })

  const gyms = useGetGymsQuery()
  const trainingQuery = useGetTrainingQuery(_id!)

  return (
    <FormProvider {...methods}>
      <Grid item={true} container={true} lg={4} spacing={2}>
        <Grid item={true} lg={12}>
          <FormController name='gym' rules={requiredValidation}>
            <Select
              label='Зал'
              fullWidth={true}
              variant='outlined'
              disabled={trainingQuery.data?.trainingResources.length! > 0}
              helperText='Нельзя сменить зал при активных ресурсах'
              linked={true}
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
          <Box marginBottom={2.5} />
        </Grid>
        <Grid item={true} lg={12}>
          <FormController name='date' rules={requiredValidation}>
            <DatePicker
              label='Дата'
              inputVariant='outlined'
              disableToolbar={true}
              fullWidth={true}
              variant='inline'
              disabled={true}
            />
          </FormController>
        </Grid>
      </Grid>
      <Grid item={true} container={true} lg={4} spacing={2}>
        <Grid item={true} lg={12}>
          <FormController name='name'>
            <TextInput
              label='Название'
              fullWidth={true}
              variant='outlined'
            />
          </FormController>
          <Box marginBottom={2.5} />
        </Grid>
        <Grid item={true} lg={8}>
          <FormController name='type' rules={requiredValidation}>
            <Select
              label='Тип треннировки'
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
          </FormController>
        </Grid>
        <Grid item={true} lg={4}>
          <FormController name='traineesAmount' rules={requiredValidation}>
            <TextInput
              label='Кол-во'
              fullWidth={true}
              variant='outlined'
              type='number'
            />
          </FormController>
        </Grid>
      </Grid>
      <Grid item={true} container={true} lg={4} spacing={2}>
        <Grid item={true} lg={12}>
          <FormController name='note'>
            <TextInput
              label='Комментарий'
              rows={6}
              fullWidth={true}
              variant='outlined'
              multiline={true}
            />
          </FormController>
        </Grid>
      </Grid>
      <Grid item={true} lg={12} container={true}>
        {
          trainingQuery.data?.training && (
            <DeleteButton />
          )
        }
        <Box marginLeft='auto'>
          <SubmitButton />
        </Box>
      </Grid>
    </FormProvider>
  )
}
