import React from 'react'

import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper'

import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'

import { times, resources, trainers, trainerSchedule, schedule as initialSchedule } from './data'

import { DND_CREATE_TRAINING, DND_MOVE_TRAINING } from './constants'

import DragableAvatar from './components/dragable-avatar'
import DropableCell from './components/dropable-cell'

const isTrainerAvailableAtTime = (trainer: number, time: string) => {
  const scheduleRow = trainerSchedule.find(record => record.time === time)
  const tr = scheduleRow && scheduleRow.trainers.find(tr => tr === trainer)

  return tr !== undefined
}

const mappedTrainerSchedule = trainerSchedule.map(ts => ({
  time: ts.time,
  trainers: ts.trainers.map(t => trainers.find(tr => tr.id === t)),
}))

const RecordCell = ({ time, resource, mappedSchedule, createRecord, moveRecord }: any) => {
  const record = React.useMemo(
    () => mappedSchedule.find((record: any) => record.time === time && record.resource === resource),
    [mappedSchedule, time, resource]
  )

  const onDrop = React.useCallback((type: typeof DND_CREATE_TRAINING | typeof DND_MOVE_TRAINING, source: { time: string, resource: number }, trainer: number) => {
    if (type === DND_CREATE_TRAINING) {
      createRecord({ time, resource }, source, trainer)
    } else if (type === DND_MOVE_TRAINING) {
      moveRecord({ time, resource }, source, trainer)
    }
  }, [createRecord, moveRecord, time, resource])

  const canDrop = React.useCallback((type: typeof DND_CREATE_TRAINING | typeof DND_MOVE_TRAINING, source: { time: string, resource: number }, trainer: number) => {
    if (type === DND_CREATE_TRAINING) {
      if (record) {
        return false
      }

      if (!isTrainerAvailableAtTime(trainer, time)) {
        return false
      }

      return true
    }

    if (type === DND_MOVE_TRAINING) {
      if (record && !isTrainerAvailableAtTime(record.trainer.id, source.time)) {
        return false
      }

      if (!isTrainerAvailableAtTime(trainer, time)) {
        return false
      }

      return true
    }

    return true
  }, [record, time])

  return (
    <DropableCell onDrop={onDrop} canDrop={canDrop} isOccupied={!!record}>
      {
        record ? (
          <DragableAvatar
            type={DND_MOVE_TRAINING}
            source={{
              time,
              resource,
            }}
            trainer={record.trainer.id}
            src={record.trainer.avatar}
          />
        ) : null
      }
    </DropableCell>
  )
}

const SchedulePage = ({ }) => {
  const [schedule, setSchedule] = React.useState(initialSchedule)

  const mappedSchedule = schedule.map(record => ({
    time: record.time,
    resource: record.resource,
    trainer: trainers.find(tr => tr.id === record.trainer),
  }))

  const createScheduleRecord = React.useCallback(
    (target: any, source: any, trainer: any) => setSchedule(schedule => {
      return [
        ...schedule,
        { time: target.time, resource: target.resource, trainer },
      ]
    }),
    [setSchedule]
  )

  const moveScheduleRecord = React.useCallback(
    (target: any, source: any, trainer: any) => {
      const targetIndex = schedule.findIndex(record => record.time === target.time && record.resource === target.resource)
      const sourceIndex = schedule.findIndex(record => record.time === source.time && record.resource === source.resource)

      if (targetIndex === -1) {
        setSchedule([
          ...schedule.filter((i, index) => index !== sourceIndex),
          { time: target.time, resource: target.resource, trainer: schedule[sourceIndex].trainer },
        ])
      } else {
        setSchedule([
          ...schedule.filter((i, index) => index !== sourceIndex && index !== targetIndex),
          { time: target.time, resource: target.resource, trainer: schedule[sourceIndex].trainer },
          { time: source.time, resource: source.resource, trainer: schedule[targetIndex].trainer },
        ])
      }
    },
    [schedule, setSchedule]
  )

  return (
    <Paper>
      <Table aria-label='simple table'>
        <TableHead>
          <TableRow>
            <TableCell>Time</TableCell>
            <TableCell>Trainers</TableCell>
            {
              resources.map(r => (
                <TableCell key={r.id} align='center'>{r.name}</TableCell>
              ))
            }
          </TableRow>
        </TableHead>
        <TableBody>
          {
            times.map(t => (
              <TableRow key={t}>
                <TableCell scope='row'>
                  {t}
                </TableCell>
                <TableCell scope='row'>
                  <Grid container={true}>
                    {
                      (mappedTrainerSchedule.find(ts => ts.time === t) as any).trainers.map((tr: any) => (
                        <DragableAvatar type={DND_CREATE_TRAINING} source={{ time: t, resource: null }} trainer={tr.id} src={tr.avatar} key={tr.id} />
                      ))
                    }
                  </Grid>
                </TableCell>
                {
                  resources.map(r => (
                    <RecordCell
                      createRecord={createScheduleRecord}
                      moveRecord={moveScheduleRecord}
                      mappedSchedule={mappedSchedule}
                      resource={r.id}
                      time={t}
                      key={r.id}
                    />
                  ))
                }
              </TableRow>
            ))
          }
        </TableBody>
      </Table>
    </Paper>
  )
}

export default SchedulePage
