import React from 'react'
import { IStoreState, useSelector, useActions } from 'store'

import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button'

import ResourceSelect from './resource-select'
import TrainerSelect from './trainer-select'
import StartTimeSelect from './start-time-select'
import EndTimeSelect from './end-time-select'

import SaveButton from './save-button'

const fieldSelector = (name: any) => (state: IStoreState) => {
  const form: any = state.schedule.trainingDialog.resourceForm
  if (form) {
    return form[name]
  }

  return null
}

export default function ResourcesBlock() {
  const actions = useActions()
  const isFormActive = useSelector(state => !!state.schedule.trainingDialog.resourceForm)

  const handleChange = React.useCallback(
    (name, value) => {
      actions.schedule.trainingDialog.updateResourceField(name, value)
    },
    [actions]
  )

  if (!isFormActive) {
    return null
  }

  return (
    <Grid item={true} lg={8} container={true} spacing={3}>
      <Grid item={true} lg={12}>
        <ResourceSelect
          name='resource'
          label='Ресурс'
        />
      </Grid>
      <Grid item={true} lg={12}>
        <TrainerSelect
          name='trainer'
          label='Тренер'
        />
      </Grid>
      <Grid item={true} lg={6}>
        <StartTimeSelect
          name='startTime'
          onChange={handleChange}
          fieldSelector={fieldSelector}
          label={'Время начала'}
        />
      </Grid>
      <Grid item={true} lg={6}>
        <EndTimeSelect
          name='endTime'
          onChange={handleChange}
          fieldSelector={fieldSelector}
          label={'Время конца'}
        />
      </Grid>
      <Grid item={true} lg={12} container={true} justify='space-between'>
        <Button color='primary'>
          Отменить
        </Button>
        <SaveButton />
      </Grid>
    </Grid>
  )
}
