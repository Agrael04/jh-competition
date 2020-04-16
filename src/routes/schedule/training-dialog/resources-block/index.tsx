import React from 'react'
import { IStoreState, useSelector, useActions } from 'store'

import Grid from '@material-ui/core/Grid'
import Avatar from '@material-ui/core/Avatar'
import IconButton from '@material-ui/core/IconButton'
import Chip from '@material-ui/core/Chip'
import Box from '@material-ui/core/Box'
import Typography from '@material-ui/core/Typography'
import Collapse from '@material-ui/core/Collapse'

import AddIcon from '@material-ui/icons/Add'
import CancelIcon from '@material-ui/icons/Cancel'
import CheckCircleIcon from '@material-ui/icons/CheckCircle'
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown'
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp'

import ResourceChip from './resource-chip'
import ResourceSelect from './resource-select'
import TrainerSelect from './trainer-select'
import StartTimeSelect from './start-time-select'
import EndTimeSelect from './end-time-select'

import useCreateTrainingResource from '../../mutations/create-training-resource'
import useUpdateTrainingResource from '../../mutations/update-training-resource'

const fieldSelector = (name: any) => (state: IStoreState) => {
  const form: any = state.schedule.trainingDialog.resourceForm
  if (form) {
    return form[name]
  }

  return null
}

export default function ResourceBlock() {
  const actions = useActions()
  const trainingResources = useSelector(state => state.schedule.trainingDialog.resources)
  const resourceForm = useSelector(state => state.schedule.trainingDialog.resourceForm)
  const mode = useSelector(state => state.schedule.trainingDialog.mode)
  const resourceMode = useSelector(state => state.schedule.trainingDialog.resourceMode)
  const trainingForm = useSelector(state => state.schedule.trainingDialog.trainingForm)

  const updateTrainingResource = useUpdateTrainingResource()
  const createTrainingResource = useCreateTrainingResource()

  const [opened, setOpened] = React.useState(true)

  const handleChange = React.useCallback(
    (name, value) => {
      actions.schedule.trainingDialog.updateResourceField(name, value)
    },
    [actions]
  )

  const activate = React.useCallback(
    () => actions.schedule.trainingDialog.openResource(),
    [actions]
  )

  const close = React.useCallback(
    () => actions.schedule.trainingDialog.setResource(null, null),
    [actions]
  )

  const save = React.useCallback(
    async () => {
      if (mode === 'update') {
        if (resourceMode === 'update') {
          await updateTrainingResource(trainingForm!, resourceForm!)
        } else if (resourceMode === 'create') {
          await createTrainingResource(trainingForm!, resourceForm!)
        }
      }

      actions.schedule.trainingDialog.saveResource()
    },
    [actions, updateTrainingResource, resourceForm, mode, resourceMode, trainingForm, createTrainingResource]
  )

  const toggleOpened = () => setOpened(!opened)

  return (
    <>
      <Grid item={true} lg={12} container={true} justify='space-between'>
        <Box marginY='auto'>
          <Typography>
            Ресурсы
          </Typography>
        </Box>
        <IconButton onClick={toggleOpened}>
          {
            opened
              ? <KeyboardArrowUpIcon />
              : <KeyboardArrowDownIcon />
          }
        </IconButton>
      </Grid>
      <Grid item={true} lg={12} container={true}>
        <Box marginRight={0.5} marginBottom={0.5}>
          <Chip
            avatar={<Avatar><AddIcon /></Avatar>}
            label={'Добавить'}
            color={resourceMode === 'create' ? 'secondary' : 'primary'}
            variant={resourceMode === 'create' ? undefined : 'outlined'}
            onClick={activate}
          />
        </Box>
        {
          trainingResources.map(resource => (
            <Box marginRight={0.5} marginBottom={0.5} key={resource._id}>
              <ResourceChip id={resource._id} />
            </Box>
          ))
        }
      </Grid>
      {
        resourceForm && (
          <>
            <Grid item={true} lg={3}>
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
                label={'Время завершения'}
              />
            </Grid>

            <Grid item={true} lg={2} container={true} justify='flex-end'>
              <IconButton onClick={close}>
                <CancelIcon />
              </IconButton>
              <IconButton color='primary' onClick={save}>
                <CheckCircleIcon />
              </IconButton>
            </Grid>
          </>
        )
      }
    </>
  )
}
