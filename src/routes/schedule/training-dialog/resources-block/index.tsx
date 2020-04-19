import React from 'react'
import { IStoreState, useSelector, useActions } from 'store'

import Grid from '@material-ui/core/Grid'
import IconButton from '@material-ui/core/IconButton'
import Box from '@material-ui/core/Box'
import Typography from '@material-ui/core/Typography'
import Collapse from '@material-ui/core/Collapse'

import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown'
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp'

import AddChip from './add-chip'
import ResourceChip from './resource-chip'
import ResourceSelect from './resource-select'
import TrainerSelect from './trainer-select'
import StartTimeSelect from './start-time-select'
import EndTimeSelect from './end-time-select'

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
  const isFormActive = useSelector(state => !!state.schedule.trainingDialog.resourceForm)

  const [opened, setOpened] = React.useState(true)

  const handleChange = React.useCallback(
    (name, value) => {
      actions.schedule.trainingDialog.updateResourceField(name, value)
    },
    [actions]
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
      <Box width={1} paddingX={1.5}>
        <Collapse in={opened} timeout='auto' unmountOnExit={true}>
          <Grid container={true} spacing={3}>
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

                  <Grid item={true} lg={2} container={true} justify='flex-end' />
                </Grid>
              )
            }
          </Grid>
        </Collapse>
      </Box>
    </>
  )
}
