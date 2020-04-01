import React from 'react'
import { useActions } from 'store'

import CircularProgress from '@material-ui/core/CircularProgress'
import Button from '@material-ui/core/Button'
import ButtonBase from '@material-ui/core/ButtonBase'
import Avatar from '@material-ui/core/Avatar'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import Box from '@material-ui/core/Box'
import Zoom from '@material-ui/core/Zoom'
import Divider from '@material-ui/core/Divider'

import FaceIcon from '@material-ui/icons/Face'

import useGetTrainingQuery from '../queries/get-training'
import { trainers, times } from '../data'

import useStyles from './styles'

import getColorPallete from 'utils/get-color-pallete'

interface IProps {
  time: number
  resource: number
  id: string | undefined
}

const TrainingCell = ({ time, resource, id }: IProps) => {
  const classes = useStyles()
  const actions = useActions()

  const { data, loading } = useGetTrainingQuery(id)

  const training = data?.training
  const records = data?.trainingRecords

  const trainer = React.useMemo(
    () => trainers.find(tr => tr.id === training?.trainer),
    [training]
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
      actions.schedule.page.openUpdateTrainingDialog(training!, records!)
    },
    [training, records, actions]
  )

  const color = React.useMemo(
    () => {
      if (loading || training?.trainer === null || training?.trainer === undefined) {
        return getColorPallete(undefined)
      }

      return getColorPallete(training.trainer)
    },
    [loading, training]
  )

  const backgroundStyle = React.useMemo(
    () => ({ backgroundColor: color[500] }),
    [color]
  )

  const borderColorStyle = React.useMemo(
    () => ({ borderColor: color[500] }),
    [color]
  )

  const isOccupied = !loading && !!training

  if (loading) {
    return (
      <Button className={classes.button}>
        <CircularProgress />
      </Button>
    )
  }

  if (!training) {
    return (
      <Zoom in={true}>
        <Button onDoubleClick={handleCreateClick} fullWidth={true} className={classes.button} style={isOccupied ? backgroundStyle : undefined} />
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
                {times.find(t => t.id === training?.startTime)?.label} - {times.find(t => t.id === training?.endTime)?.label}
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
