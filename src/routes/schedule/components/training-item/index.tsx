import React from 'react'
import { useActions } from 'store'

import { trainers } from '../../data'

import Avatar from '@material-ui/core/Avatar'
import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button'

import FaceIcon from '@material-ui/icons/Face'

import getColorPallete from 'utils/get-color-pallete'
import Tooltip from 'components/multiline-tooltip'

import useStyles from './styles'
import ITraining, { ITrainingRecord } from 'interfaces/training'

const TrainingItem = ({ training, records }: { training: ITraining, records: ITrainingRecord[] }) => {
  const actions = useActions()
  const classes = useStyles()

  const trainer = React.useMemo(
    () => trainers.find(tr => tr.id === training.trainer),
    [training]
  )

  const handleDoubleClick = React.useCallback(
    e => {
      e.stopPropagation()
      actions.schedule.openUpdateDialog(training, records)
    },
    [training, records, actions]
  )

  const borderColorStyle = React.useMemo(
    () => ({
      borderColor: getColorPallete(trainer?.id)[500],
    }),
    [trainer]
  )

  const noTrainerStyle = React.useMemo(
    () => !trainer && ({ margin: 0 }),
    [trainer]
  )

  return (
    <Button onDoubleClick={handleDoubleClick} fullWidth={true}>
      <Grid container={true} wrap='nowrap' justify='center'>
        {
          trainer && (
            <Tooltip rows={['Информация о тренировке']}>
              <Avatar src={trainer?.avatarSrc} className={classes.mainAvatar} style={borderColorStyle} />
            </Tooltip>
          )
        }
        {
          !trainer && records.length === 0 && (
            <Tooltip rows={['Нет учеников и тренера']}>
              <Avatar className={classes.mainAvatar} style={borderColorStyle}>
                <FaceIcon />
              </Avatar>
            </Tooltip>
          )
        }

        {
          records.map((r, index) => (
            <Tooltip rows={[r.trainee.fullName]} key={index}>
              <Avatar className={classes.secondaryAvatar} style={{ zIndex: records.length - index, ...borderColorStyle, ...noTrainerStyle }}>
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
  )
}

export default TrainingItem
