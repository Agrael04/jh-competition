import React from 'react'
import { useSelector } from 'store'

import Avatar from '@material-ui/core/Avatar'
import Badge from '@material-ui/core/Badge'
import { DND_CREATE_TRAINING } from './constants'

import DragableAvatarWrap from './components/avatar-wrap'
import Tooltip from 'components/multiline-tooltip'

import { makeStyles, Theme } from '@material-ui/core/styles'
import getColorPallete from 'utils/get-color-pallete'

const useStyles = (color: any) => makeStyles((theme: Theme) => ({
  badgeBackground: {
    backgroundColor: color[400],
  },
}))

export const useBadgeBackground = (id: number) => {
  const color = getColorPallete(id)
  const classes = useStyles(color)

  return classes
}

const TrainerAvatar = ({ trainer, time }: any) => {
  const recordsCount = useSelector(state => state.trainings.data.filter(r => r.time === time && r.trainer === trainer.id).length)
  const classes = useBadgeBackground(trainer.id)()

  return (
    <DragableAvatarWrap
      type={DND_CREATE_TRAINING}
      source={{ time, resource: null }}
      trainer={trainer.id}
      src={trainer.avatar}
      badgeContent={recordsCount}
    >
      <Tooltip rows={[trainer.name]}>
        <Badge
          overlap='circle'
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'right',
          }}
          badgeContent={recordsCount}
          color={'error'}
          classes={{
            'badge': classes.badgeBackground,
          }}
        >
          <Avatar src={trainer.avatar} />
        </Badge>
      </Tooltip>
    </DragableAvatarWrap>
  )
}

export default TrainerAvatar
