import React from 'react'
import { useSelector } from '../../store'

import { DND_CREATE_TRAINING } from './constants'

import DragableAvatar from './components/dragable-avatar'

const TrainerAvatar = ({ trainer, time }: any) => {
  const recordsCount = useSelector(state => state.schedule.schedule.filter(r => r.time === time && r.trainer === trainer.id).length)

  return (
    <DragableAvatar
      type={DND_CREATE_TRAINING}
      source={{ time, resource: null }}
      trainer={trainer.id}
      key={trainer.id}
      tooltipRows={[trainer.name]}
      src={trainer.avatar}
      badgeContent={recordsCount}
    />
  )
}

export default TrainerAvatar
