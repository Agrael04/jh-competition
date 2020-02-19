import React from 'react'
import { useSelector } from 'react-redux'
import { IStoreState } from '../../store'

import Grid from '@material-ui/core/Grid'
import Badge from '@material-ui/core/Badge'

import TableCell from '@material-ui/core/TableCell'

import { trainers, trainerSchedule } from './data'

import { DND_CREATE_TRAINING } from './constants'

import DragableAvatar from './components/dragable-avatar'

const mappedTrainerSchedule = trainerSchedule.map(ts => ({
  time: ts.time,
  trainers: ts.trainers.map(t => trainers.find(tr => tr.id === t)),
}))

const BadgeWrap = (count: number) => ({ children }: any) => (
  <Badge
    overlap='circle'
    anchorOrigin={{
      vertical: 'bottom',
      horizontal: 'right',
    }}
    badgeContent={<div>{count ? count : ''}</div>}
    color={count === 0 ? 'primary' : 'error'}
  >
    {children}
  </Badge>
)

const TrainersCell = ({ time }: any) => {
  const records = useSelector((state: IStoreState) => state.schedule.schedule.filter(r => r.time === time))

  return (
    <TableCell padding='none'>
      <Grid container={true}>
        {
          (mappedTrainerSchedule.find(ts => ts.time === time) as any).trainers.map((tr: any) => (
            <DragableAvatar
              type={DND_CREATE_TRAINING}
              source={{ time, resource: null }}
              trainer={tr.id}
              key={tr.id}
              tooltipRows={[tr.name]}
              src={tr.avatar}
              Badge={BadgeWrap(records.filter(r => r.trainer === tr.id).length)}
            />
          ))
        }
      </Grid>
    </TableCell>
  )
}

export default TrainersCell
