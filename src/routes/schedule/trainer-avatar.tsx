import React from 'react'

import Avatar from '@material-ui/core/Avatar'
import Badge from '@material-ui/core/Badge'
import Button from '@material-ui/core/Button'

import Tooltip from 'components/multiline-tooltip'

import { makeStyles, Theme } from '@material-ui/core/styles'
import getColorPallete from 'utils/get-color-pallete'

const useStyles = (color: any) => makeStyles((theme: Theme) => ({
  badgeBackground: {
    backgroundColor: color[500],
  },
}))

export const useBadgeBackground = (id: number) => {
  const color = getColorPallete(id)
  const classes = useStyles(color)

  return classes
}

const TrainerAvatar = ({ trainer, count }: any) => {
  const classes = useBadgeBackground(trainer.id)()

  return (
    <Button>
      <Tooltip rows={[`${trainer.lastName} ${trainer.firstName}`]}>
        <Badge
          overlap='circle'
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'right',
          }}
          badgeContent={count}
          color={'error'}
          classes={{
            'badge': classes.badgeBackground,
          }}
        >
          <Avatar src={trainer.avatarSrc} />
        </Badge>
      </Tooltip>
    </Button>
  )
}

export default TrainerAvatar
