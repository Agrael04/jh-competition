import React from 'react'
import { IStoreState, useSelector, useActions } from 'store'

import { trainers } from '../../data'

import { DND_MOVE_TRAINING } from '../../constants'

import Avatar from '@material-ui/core/Avatar'

import { DragableAvatarWrap } from '../avatar-wrap'

import FaceIcon from '@material-ui/icons/Face'

import getColorPallete from 'utils/get-color-pallete'
import Tooltip from 'components/multiline-tooltip'

import useStyles from './styles'

const selector =
  (time: string, resource: number) =>
    (state: IStoreState) => state.trainings.data.find(
      record => record.time === time && record.resource === resource
    )

const TrainingItem = ({ time, resource }: any) => {
  const record = useSelector(selector(time, resource))
  const actions = useActions()
  const classes = useStyles()

  const trainer = React.useMemo(
    () => record && trainers.find(tr => tr.id === record.trainer),
    [record]
  )

  const source = React.useMemo(
    () => ({ time, resource }),
    [time, resource]
  )

  const handleDoubleClick = React.useCallback(
    e => {
      e.stopPropagation()
      if (record) {
        actions.schedule.openUpdateDialog(record)
      }
    },
    [record, actions]
  )

  const borderColorStyle = React.useMemo(
    () => ({
      borderColor: getColorPallete(trainer?.id)[400],
    }),
    [trainer]
  )

  const noTrainerStyle = React.useMemo(
    () => !trainer && ({ margin: 0 }),
    [trainer]
  )

  if (!record) {
    return null
  }

  return (
    <DragableAvatarWrap
      type={DND_MOVE_TRAINING}
      source={source}
      trainer={record.trainer}
      handleDoubleClick={handleDoubleClick}
    >
      <div style={{ display: 'flex' }}>
        {
          trainer && (
            <Tooltip rows={['Информация о тренировке']}>
              <Avatar src={trainer?.avatar} className={classes.mainAvatar} style={borderColorStyle} />
            </Tooltip>
          )
        }
        {
          !trainer && record.records.length === 0 && (
            <Tooltip rows={['Нет учеников и тренера']}>
              <Avatar className={classes.mainAvatar} style={borderColorStyle}>
                <FaceIcon />
              </Avatar>
            </Tooltip>
          )
        }

        {
          record.records.map((r, index) => (
            <Tooltip rows={[r.trainee.fullName]} key={index}>
              <Avatar className={classes.secondaryAvatar} style={{ zIndex: record.records.length - index, ...borderColorStyle, ...noTrainerStyle }}>
                {
                  r.trainee.fullName
                  ? r.trainee.fullName.split(' ').filter((r, i) => i < 2).map(r => r[0]).join('')
                  : <FaceIcon />
                }
              </Avatar>
            </Tooltip>
          ))
        }
      </div>
    </DragableAvatarWrap>
  )
}

export default TrainingItem
