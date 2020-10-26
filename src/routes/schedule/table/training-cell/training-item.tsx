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

import PersonIcon from '@material-ui/icons/Person'
import PeopleIcon from '@material-ui/icons/People'

import useGetTrainingResourceQuery from '../../queries/get-training-resource'

import { getTimeLabel } from 'data/times'
import { GROUP_TRAININGS } from 'data/training-types'
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
      if (!tResource) {
        return
      }

      const initialForm = {
        resource: { link: tResource.resource._id },
        trainer: tResource.trainer ? { link: tResource.trainer._id } : undefined,
        startTime: tResource.startTime,
        endTime: tResource.endTime,
      }

      e.stopPropagation()
      actions.schedule.trainingDialog.open(tResource.training._id)
      actions.schedule.trainingDialog.setStep(1)
      actions.schedule.trainingDialog.openUpdateResourceForm(
        tResource._id,
        initialForm
      )
    },
    [actions, tResource]
  )

  const color = React.useMemo(
    () => {
      if (records?.filter(r => r.status === 'DEBT').length! > 0) {
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
    () => {
      const tColor = trainer ? getColorPallete(trainer?.color) : color

      return ({ background: `linear-gradient(-45deg, ${color[500]} 85%, ${tColor[500]} 50%)` })
    },
    [color, trainer]
  )

  const isOccupied = !!tResource

  const isMulti = (
    type === GROUP_TRAININGS.GROUP ||
    type === GROUP_TRAININGS.EVENT ||
    type === GROUP_TRAININGS.SECTION
  )

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
                <Avatar className={classes.mainAvatar}>
                  {
                    isMulti
                    ? (
                      <PeopleIcon />
                    ) : (
                      <PersonIcon />
                    )
                  }
                </Avatar>
              </Grid>

              <Grid item={true} lg={8} container={true}>
                <Box margin='auto'>
                  <Typography color='inherit' variant='caption'>
                    {getTimeLabel(tResource?.startTime)} - {getTimeLabel(tResource?.endTime)}
                  </Typography>
                  {/* <br />
                  <Typography color='inherit' variant='caption'>
                    {trainingTypes.find(t => t.id === type)?.text}
                  </Typography> */}
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
