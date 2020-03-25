import React from 'react'
import clsx from 'clsx'

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
  emptyTrainer: {
    filter: 'grayscale(1)',
  },
  avatarButton: {
    minWidth: 'unset',
    padding: theme.spacing(0.5),
  },
}))

export const useBadgeBackground = (id: number) => {
  const color = getColorPallete(id)
  const classes = useStyles(color)

  return classes
}

const TrainerAvatar = ({ trainer, getCount, showBadge, className }: any) => {
  const classes = useBadgeBackground(trainer.id)()

  const count = React.useMemo(
    () => {
      return getCount(trainer.id)
    },
    [getCount, trainer]
  )

  return (
    <Button className={clsx(classes.avatarButton, className)}>
      <Tooltip rows={[`${trainer.lastName} ${trainer.firstName}`]}>
        <Badge
          overlap='circle'
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'right',
          }}
          badgeContent={showBadge ? count : undefined}
          color={'error'}
          classes={{
            'badge': classes.badgeBackground,
          }}
        >
          <Avatar src={trainer.avatarSrc} className={clsx(!count && classes.emptyTrainer)} />
        </Badge>
      </Tooltip>
    </Button>
  )
}

export default TrainerAvatar
