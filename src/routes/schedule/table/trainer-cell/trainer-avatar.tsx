import React from 'react'
import clsx from 'clsx'

import Avatar from '@material-ui/core/Avatar'
import Badge from '@material-ui/core/Badge'
import Button from '@material-ui/core/Button'

import Tooltip from 'components/multiline-tooltip'

import { makeStyles, Theme } from '@material-ui/core/styles'
import getColorPallete from 'utils/get-color-pallete'

import useGetTrainingResourcesQuery from '../../queries/get-training-resources'

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

const TrainerAvatar = ({ time, trainer, showBadge, className }: any) => {
  const classes = useBadgeBackground(trainer.color)()
  const { data } = useGetTrainingResourcesQuery()

  const count = React.useMemo(
    () => {
      return data?.trainingResources.filter(
        tr => time >= tr.startTime && time < tr.endTime && tr.trainer?._id === trainer._id
      ).length
    },
    [data, time, trainer]
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
