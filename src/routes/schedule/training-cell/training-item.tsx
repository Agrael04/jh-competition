import React from 'react'
import { useActions } from 'store'

import Button from '@material-ui/core/Button'
import ButtonBase from '@material-ui/core/ButtonBase'
import Avatar from '@material-ui/core/Avatar'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import Box from '@material-ui/core/Box'
import Zoom from '@material-ui/core/Zoom'
import Divider from '@material-ui/core/Divider'

import FaceIcon from '@material-ui/icons/Face'

import useGetTrainingResourcesQuery from '../queries/get-training-resources'

import times from 'data/times'
import getColorPallete from 'utils/get-color-pallete'

import useStyles from './styles'

interface IProps {
  time: number
  resource: string
  id: string | undefined
  trainingId: string | undefined
}

const trainingTexts = {
  'GROUP': 'Группа',
  'RENT': 'Аренда',
  'RENT_WITH_TRAINER': 'Аренда',
  'EVENT': 'Событие',
}

const TrainingCell = ({ time, resource, id, trainingId }: IProps) => {
  const classes = useStyles()
  const actions = useActions()

  const trainingResourceRes = useGetTrainingResourcesQuery()

  const tResource = trainingResourceRes.data?.trainingResources.find(tr => tr._id === id)

  const trainer = React.useMemo(
    () => tResource?.trainer,
    [tResource]
  )

  const handleCreateClick = React.useCallback(
    e => {
      e.stopPropagation()
      actions.schedule.page.openCreateTrainingDialog(resource, time)
    },
    [actions, resource, time]
  )

  const handleUpdateClick = React.useCallback(
    e => {
      e.stopPropagation()
      actions.schedule.trainingDialog.open('update', trainingId!)
    },
    [actions, trainingId]
  )

  const color = React.useMemo(
    () => {
      return getColorPallete(trainer?.color)
    },
    [trainer]
  )

  const backgroundStyle = React.useMemo(
    () => ({ backgroundColor: color[500] }),
    [color]
  )

  const borderColorStyle = React.useMemo(
    () => ({ borderColor: color[500] }),
    [color]
  )

  const isOccupied = !!tResource

  if (!tResource) {
    return (
      <Zoom in={true}>
        <Button onDoubleClick={handleCreateClick} fullWidth={true} className={classes.button} style={isOccupied ? backgroundStyle : undefined}>
          {' '}
        </Button>
      </Zoom>
    )
  }

  return (
    <Zoom in={true}>
      <ButtonBase onDoubleClick={handleUpdateClick} className={classes.button} style={isOccupied ? backgroundStyle : undefined}>
        <Box height='100%' color='white'>
          <Grid container={true} justify='space-between'>
            <Avatar src={trainer?.avatarSrc} className={classes.mainAvatar} style={borderColorStyle}>
              <FaceIcon />
            </Avatar>

            <Box margin='auto'>
              <Typography color='inherit' variant='caption'>
                {times.find(t => t.id === tResource?.startTime)?.label} - {times.find(t => t.id === tResource?.endTime)?.label}
              </Typography>
              <br />
              <Typography color='inherit' variant='caption'>
                {(trainingTexts as any)[tResource.training?.type!]}
              </Typography>
            </Box>
          </Grid>
          <Box marginY={0.5}>
            <Divider className={classes.divider} />
          </Box>
        </Box>
      </ButtonBase>
    </Zoom>
  )
}

export default TrainingCell
