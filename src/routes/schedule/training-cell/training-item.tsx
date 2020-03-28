import React from 'react'
import { useActions } from 'store'

import CircularProgress from '@material-ui/core/CircularProgress'
import Button from '@material-ui/core/Button'
import Avatar from '@material-ui/core/Avatar'
import Grid from '@material-ui/core/Grid'
import Zoom from '@material-ui/core/Zoom'

import PersonAddIcon from '@material-ui/icons/PersonAdd'
import FaceIcon from '@material-ui/icons/Face'

import Tooltip from 'components/multiline-tooltip'

import useGetTrainingQuery from '../queries/get-training'
import { trainers } from '../data'

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
      actions.schedule.page.openCreateDialog(resource, time)
    },
    [actions, resource, time]
  )

  const handleUpdateClick = React.useCallback(
    e => {
      e.stopPropagation()
      actions.schedule.page.openUpdateDialog(training!, records!)
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

  const noTrainerStyle = React.useMemo(
    () => !trainer && ({ margin: 0 }),
    [trainer]
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
        <Button onDoubleClick={handleCreateClick} fullWidth={true} className={classes.button} style={isOccupied ? backgroundStyle : undefined}>
          <Tooltip rows={['Добавить тренировку']}>
            <PersonAddIcon />
          </Tooltip>
        </Button>
      </Zoom>
    )
  }

  return (
    <Zoom in={true}>
      <Button onDoubleClick={handleUpdateClick} fullWidth={true} className={classes.button} style={isOccupied ? backgroundStyle : undefined}>
        <Grid container={true} wrap='nowrap' justify='center'>
          {
            trainer && (
              <Tooltip rows={['Информация о тренировке']}>
                <Avatar src={trainer?.avatarSrc} className={classes.mainAvatar} style={borderColorStyle} />
              </Tooltip>
            )
          }
          {
            !trainer && records?.length === 0 && (
              <Tooltip rows={['Нет учеников и тренера']}>
                <Avatar className={classes.mainAvatar} style={borderColorStyle}>
                  <FaceIcon />
                </Avatar>
              </Tooltip>
            )
          }

          {
            records?.map((r, index) => (
              <Tooltip rows={[r.trainee.fullName]} key={index}>
                <Avatar className={classes.secondaryAvatar} style={{ zIndex: records?.length - index, ...borderColorStyle, ...noTrainerStyle }}>
                  {
                    r.trainee.fullName
                      ? r.trainee.fullName.split(' ').filter((r, i) => i < 2).map(r => r[0]).join('')
                      : <FaceIcon />
                  }
                </Avatar>
              </Tooltip>
            ))
          }
        </Grid>
      </Button>
    </Zoom>
  )
}

export default TrainingCell
