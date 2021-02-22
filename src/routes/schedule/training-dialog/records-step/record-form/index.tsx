import { useMemo } from 'react'

import { useForm, FormProvider } from 'react-hook-form'
import { useSelector, useDispatch } from 'store'

import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button'
import MenuItem from '@material-ui/core/MenuItem'

import { closeRecord } from 'store/ui/pages/schedule/training-dialog/actions'
import { selectTrainingId, selectRecordForm } from 'store/ui/pages/schedule/training-dialog/selectors'

import FormController from 'containers/fields/form-controller'
import TextInput from 'containers/fields/text-input'
import Select from 'containers/fields/select'
import ClientSuggester from 'containers/fields/client-suggester'

import getClientLabel from 'utils/get-client-label'
import { requiredValidation } from 'utils/validations'

import useGetTrainingQuery from '../../../queries/get-training'

import SubmitButton from './submit-button'
import ContactAbornment from './contact-abornment'

import { statuses } from './data'
import IRecordForm from './form'

export default function RecordsBlock() {
  const dispatch = useDispatch()

  const form = useSelector(selectRecordForm)
  const _id = useSelector(selectTrainingId)

  const defaultValues = form.defaultValues
  const recordId = form._id
  const trainingQuery = useGetTrainingQuery(_id)

  const methods = useForm<IRecordForm>({
    defaultValues,
  })

  const resetRecord = () => dispatch(closeRecord())

  const queryRecord = useMemo(
    () => {
      return trainingQuery.data?.trainingRecords.find(tr => tr._id === recordId)
    }, [trainingQuery, recordId]
  )

  const attendantLabel = getClientLabel(queryRecord?.attendant)
  const contactLabel = getClientLabel(queryRecord?.contact)
  const contactBalance = queryRecord?.contact?.balance

  return (
    <FormProvider {...methods}>
      <Grid item={true} container={true} direction='column' spacing={3}>
        <Grid item={true}>
          <FormController name='contact' rules={requiredValidation}>
            <ClientSuggester
              initialFilter={contactLabel}
              initialBalance={contactBalance}
              StartAdornment={ContactAbornment}
              rights={['RECORD']}
              label='Контактное лицо'
            />
          </FormController>
        </Grid>
        <Grid item={true}>
          <FormController name='attendant'>
            <ClientSuggester
              initialFilter={attendantLabel}
              rights={['ATTEND']}
              label='Посетитель'
            />
          </FormController>
        </Grid>
        <Grid item={true}>
          <FormController name='status'>
            <Select
              label='Статус'
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
          </FormController>
        </Grid>
        <Grid item={true}>
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
      </Grid>

      <Grid item={true} container={true} justify='space-between'>
        <Button color='primary' onClick={resetRecord}>
          Отменить
        </Button>
        <SubmitButton />
      </Grid>
    </FormProvider>
  )
}
