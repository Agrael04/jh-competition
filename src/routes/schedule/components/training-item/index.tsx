import React from 'react'
import { useActions } from 'store'

import { trainers } from '../../data'

import { DND_MOVE_TRAINING } from '../../constants'

import Avatar from '@material-ui/core/Avatar'

import { DragableAvatarWrap } from '../avatar-wrap'

import FaceIcon from '@material-ui/icons/Face'

import getColorPallete from 'utils/get-color-pallete'
import Tooltip from 'components/multiline-tooltip'

import useStyles from './styles'

const TrainingItem = ({ record }: any) => {
  const actions = useActions()
  const classes = useStyles()

  const trainer = React.useMemo(
    () => trainers.find(tr => tr.id === record.trainer),
    [record]
  )

  const source = React.useMemo(
    () => ({ time: record.time, resource: record.resource }),
    [record]
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
      borderColor: getColorPallete(trainer?.id)[500],
    }),
    [trainer]
  )

  const noTrainerStyle = React.useMemo(
    () => !trainer && ({ margin: 0 }),
    [trainer]
  )

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
              <Avatar src={trainer?.avatarSrc} className={classes.mainAvatar} style={borderColorStyle} />
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
          record.records.map((r: any, index: number) => (
            <Tooltip rows={[r.trainee.fullName]} key={index}>
              <Avatar className={classes.secondaryAvatar} style={{ zIndex: record.records.length - index, ...borderColorStyle, ...noTrainerStyle }}>
                {
                  r.trainee.fullName
                    ? r.trainee.fullName.split(' ').filter((r: any, i: number) => i < 2).map((r: any) => r[0]).join('')
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
