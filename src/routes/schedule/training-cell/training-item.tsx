import React from 'react'
import { useActions } from 'store'
import { useDrag } from 'react-dnd'

import ButtonBase from '@material-ui/core/ButtonBase'
import Avatar from '@material-ui/core/Avatar'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import Box from '@material-ui/core/Box'
import Zoom from '@material-ui/core/Zoom'
import Divider from '@material-ui/core/Divider'

import FaceIcon from '@material-ui/icons/Face'

import useGetTrainingResourceQuery, { convertTrainingResourceToInput } from '../queries/get-training-resource'

import { getTimeLabel } from 'data/times'
import { trainingTypes } from 'data/training-types'
import getColorPallete from 'utils/get-color-pallete'
import blueGrey from '@material-ui/core/colors/blueGrey'
import red from '@material-ui/core/colors/red'

import getClientLabel from 'utils/get-client-label'

import EmptyItem from './empty-item'
import useStyles from './styles'

interface IProps {
  time: number
  resource: string
  id: string | undefined
}

const TrainingCell = ({ time, resource, id }: IProps) => {
  const classes = useStyles()
  const actions = useActions()

  const trainingResourceRes = useGetTrainingResourceQuery(id)

  const tResource = trainingResourceRes.data?.trainingResource
  const records = trainingResourceRes.data?.trainingRecords

  const type = React.useMemo(
    () => tResource?.training.type,
    [tResource]
  )

  const trainer = React.useMemo(
    () => tResource?.trainer,
    [tResource]
  )

  const handleUpdateClick = React.useCallback(
    e => {
      e.stopPropagation()
      actions.schedule.trainingDialog.open('update', tResource?.training._id!)
      actions.schedule.trainingDialog.setStep(1)
      actions.schedule.trainingDialog.openUpdateResourceForm(
        convertTrainingResourceToInput(tResource!)
      )
    },
    [actions, tResource]
  )

  const color = React.useMemo(
    () => {
      if (records?.filter(r => r.status === 'CLOSED_DEBT').length! > 0) {
        return red
      }

      if (records?.filter(r => r.status === 'CLOSED').length === records?.length && records?.length! > 0) {
        return blueGrey
      }

      return getColorPallete(trainer?.color)
    },
    [trainer, records]
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

  const [, drag] = useDrag({
    item: {
      type: 'TRAINING_RESOURCE_ITEM',
      color,
      _id: tResource?._id,
      trainerId: trainer?._id,
      duration: tResource ? (tResource.endTime - tResource.startTime) : 0,
    },
  })

  if (!tResource) {
    return (
      <EmptyItem resource={resource} time={time} />
    )
  }

  return (
    <div className={classes.resource} ref={drag}>
      <Zoom in={true}>
        <ButtonBase onDoubleClick={handleUpdateClick} className={classes.button} style={isOccupied ? backgroundStyle : undefined}>
          <Box height='100%' color='white'>
            <Grid container={true} justify='space-between'>
              <Grid item={true}>
                <Avatar src={trainer?.avatarSrc} className={classes.mainAvatar} style={borderColorStyle}>
                  <FaceIcon />
                </Avatar>
              </Grid>

              <Grid item={true} lg={9}>
                <Box margin='auto'>
                  <Typography color='inherit' variant='caption'>
                    {getTimeLabel(tResource?.startTime)} - {getTimeLabel(tResource?.endTime)}
                  </Typography>
                  <br />
                  <Typography color='inherit' variant='caption'>
                    {trainingTypes.find(t => t.id === type)?.text}
                  </Typography>
                </Box>
              </Grid>
            </Grid>
            <Box marginY={0.5}>
              <Divider className={classes.divider} />
            </Box>
            {
              records?.map(r => (
                <div key={r._id}>
                  {getClientLabel(r.contact)}
                </div>
              ))
            }
          </Box>
        </ButtonBase>
      </Zoom>
    </div>
  )
}

export default TrainingCell
