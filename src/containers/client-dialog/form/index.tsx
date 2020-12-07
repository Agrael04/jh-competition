import { useForm, FormProvider } from 'react-hook-form'

import Grid from '@material-ui/core/Grid'
import Divider from '@material-ui/core/Divider'
import MenuItem from '@material-ui/core/MenuItem'

import FormController from 'containers/fields/form-controller'
import DatePicker from 'containers/fields/date-picker'
import TextInput from 'containers/fields/text-input'
import Select from 'containers/fields/select'

import SubmitButton from './submit-button'

import { communications, rights, sources } from './data'
import { requiredValidation, optionalPhoneValidation, requiredPhoneValidation } from 'utils/validations'

import IForm from './form'

export type IClientForm = IForm

interface IClientFormProps {
  defaultValues?: Partial<IClientForm>
  submit: (form: IClientForm) => void
}

export default function ClientDialog({ defaultValues, submit }: IClientFormProps) {
  const methods = useForm<IClientForm>({
    defaultValues: {
      ...defaultValues,
      birthday: defaultValues?.birthday || null,
      communicationType: defaultValues?.communicationType || [],
      rights: defaultValues?.rights || ['ATTEND', 'RECORD'],
    },
  })

  return (
    <FormProvider {...methods}>
      <Grid container={true} spacing={3} justify='space-around'>
        <Grid item={true} lg={3} container={true} spacing={3}>
          <Grid item={true} lg={12}>
            <FormController name='firstName' rules={requiredValidation}>
              <TextInput
                label='Имя'
                fullWidth={true}
                variant='outlined'
              />
            </FormController>
          </Grid>
          <Grid item={true} lg={12}>
            <FormController name='lastName' rules={requiredValidation}>
              <TextInput
                label='Фамилия'
                fullWidth={true}
                variant='outlined'
              />
            </FormController>
          </Grid>
          <Grid item={true} lg={12}>
            <FormController name='birthday'>
              <DatePicker
                label='Дата рождения'
                disableToolbar={true}
                inputVariant='outlined'
                fullWidth={true}
                format='Do MMMM, dddd'
                disableFuture={true}
                openTo='year'
                views={['year', 'month', 'date']}
              />
            </FormController>
          </Grid>
        </Grid>
        <Grid item={true} lg={3} container={true} spacing={3}>
          <Grid item={true} lg={12}>
            <FormController name='phone' rules={requiredPhoneValidation}>
              <TextInput
                label='Телефон'
                fullWidth={true}
                variant='outlined'
              />
            </FormController>
          </Grid>
          <Grid item={true} lg={12}>
            <FormController name='altPhone' rules={optionalPhoneValidation}>
              <TextInput
                label='Альтернативный Телефон'
                fullWidth={true}
                variant='outlined'
              />
            </FormController>
          </Grid>
          <Grid item={true} lg={12}>
            <FormController name='communicationType' rules={requiredValidation}>
              <Select
                label='Тип коммуникации'
                fullWidth={true}
                variant='outlined'
                multiple={true}
              >
                {
                  communications.map(communication => (
                    <MenuItem value={communication.id} key={communication.id}>
                      {communication.text}
                    </MenuItem>
                  ))
                }
              </Select>
            </FormController>
          </Grid>
        </Grid>
        <Grid item={true} lg={3} container={true} spacing={3}>
          <Grid item={true} lg={12}>
            <FormController name='questionaryNumber'>
              <TextInput
                label='Номер анкеты'
                fullWidth={true}
                variant='outlined'
              />
            </FormController>
          </Grid>
          <Grid item={true} lg={12}>
            <FormController name='source'>
              <Select
                label='Как узнал?'
                fullWidth={true}
                variant='outlined'
              >
                {
                  sources.map(source => (
                    <MenuItem value={source.id} key={source.id}>
                      {source.text}
                    </MenuItem>
                  ))
                }
              </Select>
            </FormController>
          </Grid>
          <Grid item={true} lg={12}>
            <FormController name='rights'>
              <Select
                label='Права записи/посещения'
                fullWidth={true}
                variant='outlined'
                multiple={true}
              >
                {
                  rights.map(right => (
                    <MenuItem value={right.id} key={right.id}>
                      {right.text}
                    </MenuItem>
                  ))
                }
              </Select>
            </FormController>
          </Grid>
        </Grid>
        <Grid item={true} lg={3} container={true} spacing={3}>
          <Grid item={true} lg={12}>
            <FormController name='group'>
              <TextInput
                label='Группа'
                fullWidth={true}
                variant='outlined'
              />
            </FormController>
          </Grid>
          <Grid item={true} lg={12}>
            <FormController name='groupRole'>
              <TextInput
                label='Роль в группе'
                fullWidth={true}
                variant='outlined'
              />
            </FormController>
          </Grid>
          <Grid item={true} lg={12}>
            <FormController name='level'>
              <Select
                label='Уровень'
                fullWidth={true}
                variant='outlined'
              />
            </FormController>
          </Grid>
        </Grid>
        <Grid item={true} lg={12}>
          <Divider />
        </Grid>
        <Grid item={true} lg={12}>
          <FormController name='specialConditions'>
            <TextInput
              label='Особые условия'
              fullWidth={true}
              multiline={true}
              rows={6}
              variant='outlined'
            />
          </FormController>
        </Grid>
        <Grid item={true} lg={12} container={true} justify='flex-end'>
          <SubmitButton submit={submit} />
        </Grid>
      </Grid>
    </FormProvider>
  )
}
