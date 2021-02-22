import { useForm, FormProvider } from 'react-hook-form'
import { useSelector } from 'store'

import Grid from '@material-ui/core/Grid'
import MenuItem from '@material-ui/core/MenuItem'
import Chip from '@material-ui/core/Chip'
import Box from '@material-ui/core/Box'

import { selectTrainingForm } from 'store/ui/pages/schedule/training-dialog/selectors'
import { selectPageFilters } from 'store/ui/pages/schedule/page/selectors'

import FormController from 'containers/fields/form-controller'
import Select from 'containers/fields/select'
import TextInput from 'containers/fields/text-input'

import { trainingTypes } from 'data/training-types'
import { requiredValidation } from 'utils/validations'

import useGetGymsQuery from '../../queries/get-gyms'

import TrainerSelect from './trainer-select'
import StartTimeSelect from './start-time-select'
import EndTimeSelect from './end-time-select'

import SubmitButton from './submit-button'

import IResourceForm from './form'

export default function ResourcesBlock() {
  const gyms = useGetGymsQuery()
  const form = useSelector(selectTrainingForm)
  const filters = useSelector(selectPageFilters)

  const methods = useForm<IResourceForm>({
    defaultValues: form.defaultValues,
  })

  return (
    <FormProvider {...methods}>
      <Grid item={true} lg={12} container={true}>
        <Chip
          label={filters.date.format('MMMM Do')}
          color='primary'
        />
        <Box marginLeft={1}>
          <Chip
            label={gyms.data?.gyms.find(g => g._id === filters.gym)?.name}
            color='primary'
          />
        </Box>
        <Box marginLeft={1}>
          <Chip
            label={gyms.data?.resources.find(g => g._id === form.defaultValues?.resource?.link)?.name}
            color='primary'
          />
        </Box>
      </Grid>
      <Grid item={true} lg={6}>
        <FormController name='startTime' rules={requiredValidation}>
          <StartTimeSelect />
        </FormController>
      </Grid>
      <Grid item={true} lg={6}>
        <FormController name='endTime' rules={requiredValidation}>
          <EndTimeSelect />
        </FormController>
      </Grid>
      <Grid item={true} lg={12}>
        <FormController name='trainer'>
          <TrainerSelect />
        </FormController>
      </Grid>
      <Grid item={true} lg={12}>
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
      <Grid item={true} lg={12}>
        <FormController name='name'>
          <TextInput
            label='Название'
            fullWidth={true}
            variant='outlined'
          />
        </FormController>
      </Grid>
      <Grid item={true} lg={12}>
        <FormController name='note'>
          <TextInput
            label='Комментарий'
            rows={5}
            fullWidth={true}
            variant='outlined'
            multiline={true}
          />
        </FormController>
      </Grid>
      <Grid item={true} lg={12} container={true} spacing={3}>
        <Grid item={true} lg={12} container={true} justify='flex-end'>
          {/* <Button color='primary' onClick={resetResource}>
            Отменить
          </Button> */}
          <SubmitButton />
        </Grid>
      </Grid>
    </FormProvider>
  )
}
