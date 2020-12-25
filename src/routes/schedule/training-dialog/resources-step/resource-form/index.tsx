import { useCallback, useMemo } from 'react'

import { useForm, FormProvider } from 'react-hook-form'
import { useSelector, useDispatch } from 'store'

import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button'
import Chip from '@material-ui/core/Chip'

import AddIcon from '@material-ui/icons/AddCircle'

import { closeResource, openCreateRecordForm, openUpdateRecordForm } from 'store/ui/pages/schedule/training-dialog/actions'

import { selectTrainingId, selectResourceForm } from 'store/ui/pages/schedule/training-dialog/selectors'

import getClientLabel from 'utils/get-client-label'

import FormController from 'containers/fields/form-controller'

import ResourceSelect from './resource-select'
import TrainerSelect from './trainer-select'
import StartTimeSelect from './start-time-select'
import EndTimeSelect from './end-time-select'

import SubmitButton from './submit-button'

import useGetTrainingQuery from '../../../queries/get-training'

import IResourceForm from './form'

export default function ResourcesBlock() {
  const dispatch = useDispatch()
  const form = useSelector(selectResourceForm)
  const _id = useSelector(selectTrainingId)

  const methods = useForm<IResourceForm>({
    defaultValues: form.defaultValues,
  })

  const trainingQuery = useGetTrainingQuery(_id)
  const traineesAmount = trainingQuery.data?.training.traineesAmount

  const activateNew = useCallback(
    () => {
      if (form.mode === 'update' && form._id) {
        dispatch(openCreateRecordForm({ resource: { link: form._id } }))
      }
    },
    [form]
  )

  const activate = useCallback(
    (id: string) => () => {
      const record = trainingQuery?.data?.trainingRecords.find(r => r._id === id)

      if (!record) {
        return
      }

      const initialForm = {
        resource: { link: record.resource._id },
        status: record.status,
        note: record.note,
        contact: { link: record.contact._id },
        attendant: record.attendant ? {
          link: record.attendant._id,
        } : undefined,
      }

      dispatch(openUpdateRecordForm(id, initialForm))
    },
    [trainingQuery]
  )

  const resetResource = () => {
    dispatch(closeResource())
  }

  const disabled = useMemo(
    () => {
      return (!traineesAmount || trainingQuery?.data?.trainingRecords.length! >= traineesAmount)
    }, [trainingQuery, traineesAmount]
  )

  return (
    <FormProvider {...methods}>
      <Grid item={true} lg={8} container={true} spacing={3}>
        <Grid item={true} lg={12}>
          <FormController name='resource' rules={{ required: true }}>
            <ResourceSelect />
          </FormController>
        </Grid>
        <Grid item={true} lg={6}>
          <FormController name='startTime' rules={{ required: true }}>
            <StartTimeSelect />
          </FormController>
        </Grid>
        <Grid item={true} lg={6}>
          <FormController name='endTime' rules={{ required: true }}>
            <EndTimeSelect />
          </FormController>
        </Grid>
        <Grid item={true} lg={12}>
          <FormController name='trainer'>
            <TrainerSelect />
          </FormController>
        </Grid>
        <Grid item={true} lg={12} spacing={1} container={true}>
          {
            form.mode === 'update' && (
              <Grid item={true}>
                <Chip
                  icon={<AddIcon />}
                  label='Добавить запись'
                  color='primary'
                  variant='outlined'
                  onClick={activateNew}
                  disabled={disabled}
                />
              </Grid>
            )
          }
          {
            trainingQuery?.data?.trainingRecords
              .filter(record => record.resource?._id === form?._id)
              .map(r => (
                <Grid item={true} key={r._id}>
                  <Chip
                    label={getClientLabel(r?.contact)}
                    color='primary'
                    onClick={activate(r._id)}
                  />
                </Grid>
              ))
          }
        </Grid>
        <Grid item={true} lg={12} container={true} justify='space-between'>
          <Button color='primary' onClick={resetResource}>
            Отменить
          </Button>
          <SubmitButton />
        </Grid>
      </Grid>
    </FormProvider>
  )
}
