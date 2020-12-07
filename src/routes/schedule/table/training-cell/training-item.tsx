import { useMemo, useCallback } from 'react'
import { useActions } from 'store'

import ButtonBase from '@material-ui/core/ButtonBase'
import Avatar from '@material-ui/core/Avatar'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import Box from '@material-ui/core/Box'
import Zoom from '@material-ui/core/Zoom'

import PersonIcon from '@material-ui/icons/Person'
import PeopleIcon from '@material-ui/icons/People'

import { getTimeLabel } from 'data/times'
import { GROUP_TRAININGS } from 'data/training-types'
import getColorPallete from 'utils/get-color-pallete'
import blueGrey from '@material-ui/core/colors/blueGrey'
import red from '@material-ui/core/colors/red'

import getClientLabel from 'utils/get-client-label'

import { useTrainingDrag } from './dnd'
import useGetTrainingResourceQuery from '../../queries/get-training-resource'

import useStyles from './styles'

interface IProps {
  time: number
  resource: string
}

const TrainingItem = ({ time, resource }: IProps) => {
  const classes = useStyles()
  const actions = useActions()

  const { data } = useGetTrainingResourceQuery(time, resource)

  const tResource = data?.trainingResource
  const records = data?.trainingRecords

  const type = useMemo(
    () => tResource?.training.type,
    [tResource]
  )

  const trainer = useMemo(
    () => tResource?.trainer,
    [tResource]
  )

  const handleUpdateClick = useCallback(
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

  const color = useMemo(
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

  const backgroundStyle = useMemo(
    () => {
      const tColor = trainer ? getColorPallete(trainer?.color) : color

      return ({ background: `linear-gradient(-45deg, ${color[500]} 82%, ${tColor[500]} 50%)` })
    },
    [color, trainer]
  )

  const isOccupied = !!tResource

  const isMulti = (
    type === GROUP_TRAININGS.GROUP ||
    type === GROUP_TRAININGS.EVENT ||
    type === GROUP_TRAININGS.SECTION
  )

  const [, drag] = useTrainingDrag(time, resource)

  if (!tResource) {
    return (
      null
    )
  }

  return (
    <div className={classes.resource} ref={drag}>
      <Zoom in={true}>
        <ButtonBase onDoubleClick={handleUpdateClick} className={classes.button} style={isOccupied ? backgroundStyle : undefined}>
          <Box height='100%' color='white'>
            <Box padding={1}>
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
                    {
                      trainer && (
                        <>
                          <Typography color='inherit' variant='caption'>
                            {trainer.lastName}
                            {' '}
                            {trainer.firstName}
                          </Typography>
                          <br />
                        </>
                      )
                    }
                    <Typography color='inherit' variant='caption'>
                      {getTimeLabel(tResource?.startTime)}
                      {' - '}
                      {getTimeLabel(tResource?.endTime)}
                    </Typography>
                  </Box>
                </Grid>
              </Grid>
            </Box>
            {
              tResource.endTime - tResource.startTime > 1 && (
                <Box padding={1}>
                  {
                    records?.map((r, index) => (
                      <Typography variant='caption' key={r._id} align='left' component='p'>
                        {index + 1}
                        {'. '}
                        {getClientLabel(r.contact)}
                      </Typography>
                    ))
                  }
                </Box>
              )
            }
          </Box>
        </ButtonBase>
      </Zoom>
    </div>
  )
}

export default TrainingItem
