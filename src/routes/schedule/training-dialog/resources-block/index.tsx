import React from 'react'
import { IStoreState, useSelector, useActions } from 'store'

import Grid from '@material-ui/core/Grid'

import SecondaryBlock from '../secondary-block'

import AddChip from './add-chip'
import ResourceChip from './resource-chip'
import ResourceSelect from './resource-select'
import TrainerSelect from './trainer-select'
import StartTimeSelect from './start-time-select'
import EndTimeSelect from './end-time-select'
import RecordsSelect from './records-select'

const fieldSelector = (name: any) => (state: IStoreState) => {
  const form: any = state.schedule.trainingDialog.resourceForm
  if (form) {
    return form[name]
  }

  return null
}

export default function ResourcesBlock() {
  const actions = useActions()
  const trainingResources = useSelector(state => state.schedule.trainingDialog.resources)
  const isFormActive = useSelector(state => !!state.schedule.trainingDialog.resourceForm)

  const handleChange = React.useCallback(
    (name, value) => {
      actions.schedule.trainingDialog.updateResourceField(name, value)
    },
    [actions]
  )

  return (
    <SecondaryBlock title='Ресурсы'>
      <Grid item={true} lg={12} container={true} spacing={1}>
        <Grid item={true}>
          <AddChip />
        </Grid>
        {
          trainingResources.map(resource => (
            <Grid item={true} key={resource._id}>
              <ResourceChip id={resource._id} />
            </Grid>
          ))
        }
      </Grid>
      {
        isFormActive && (
          <Grid item={true} lg={12} container={true} spacing={3}>
            <Grid item={true} lg={2}>
              <ResourceSelect
                name='resource'
                label='Ресурс'
              />
            </Grid>
            <Grid item={true} lg={3}>
              <TrainerSelect
                name='trainer'
                label='Тренер'
              />
            </Grid>
            <Grid item={true} lg={2}>
              <StartTimeSelect
                name='startTime'
                onChange={handleChange}
                fieldSelector={fieldSelector}
                label={'Время начала'}
              />
            </Grid>
            <Grid item={true} lg={2}>
              <EndTimeSelect
                name='endTime'
                onChange={handleChange}
                fieldSelector={fieldSelector}
                label={'Время конца'}
              />
            </Grid>

            <Grid item={true} lg={3} container={true}>
              <RecordsSelect
                name='records'
                label='Записи'
              />
            </Grid>
          </Grid>
        )
      }
    </SecondaryBlock>
  )
}
