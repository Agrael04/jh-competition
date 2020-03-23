import React from 'react'
import { useQuery } from '@apollo/react-hooks'

import Paper from '@material-ui/core/Paper'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import Divider from '@material-ui/core/Divider'
import CircularProgress from '@material-ui/core/CircularProgress'
import Avatar from '@material-ui/core/Avatar'
import Button from '@material-ui/core/Button'
import Fab from '@material-ui/core/Fab'
import Typography from '@material-ui/core/Typography'

import UnfoldLess from '@material-ui/icons/UnfoldLess'

import Tooltip from 'components/multiline-tooltip'

import { useSelector, useActions } from 'store'
import { times, resources } from './data'

import TrainingDialog from './training-dialog'

import Toolbar from './toolbar'
import TrainingCell from './training-cell'
import { TrainerHeaderCell, TrainerBodyCell } from './trainer-cell'

import GET_TRAININGS, { IGetTrainingsResponse } from './queries/get-trainings'

import useStyles from './styles'

const TimeFab = ({ time, onClick, index }: { time: any, index: number, onClick: (time: number) => void }) => {
  const classes = useStyles()
  const boundOnClick = React.useCallback(
    () => onClick(time.id),
    [onClick, time]
  )

  return (
    <Fab onClick={boundOnClick} className={classes.toggleHiddenTime} color='primary' size='small' style={{ left: -40 + index * 56 }}>
      <Typography variant='caption'>
        {time.label}
      </Typography>
    </Fab>
  )
}

const OpenedTimeFab = ({ time, onClick }: { time: any, onClick: (time: number) => void }) => {
  const classes = useStyles()
  const boundOnClick = React.useCallback(
    () => onClick(time.id),
    [onClick, time]
  )

  return (
    <Fab onClick={boundOnClick} className={classes.toggleOpenedTime} color='primary' size='small'>
      <UnfoldLess />
    </Fab>
  )
}

const SchedulePage = () => {
  const classes = useStyles()
  const actions = useActions()
  const date = useSelector(state => state.schedule.currentDate)
  const hiddenTimes = useSelector(state => state.schedule.hiddenTimes)

  const { data, loading } = useQuery<IGetTrainingsResponse>(GET_TRAININGS, {
    variables: { date },
  })

  const filteredTimes = React.useMemo(
    () => {
      return times.filter(time => !hiddenTimes.find(t => t === time.id))
    },
    [hiddenTimes]
  )

  const showTime = actions.schedule.showTime
  const hideTime = actions.schedule.hideTime

  const getHiddenTimes = React.useCallback(
    (from: number, to?: number) => {
      return hiddenTimes.filter(ht => ht > from && ht < (to || 100)).map(ht => times.find(t => t.id === ht))
    },
    [hiddenTimes]
  )

  const getTrainingsCount = React.useCallback(
    (time: number) => (trainer: number) => {
      return data?.trainings.filter(tr => time >= tr?.startTime && time < tr?.endTime && tr?.trainer === trainer).length
    },
    [data]
  )

  const getTraining = React.useCallback(
    (time: number, resource: number) => {
      return data?.trainings.find(tr => (time >= tr?.startTime && time < tr?.endTime) && tr?.resource === resource)
    },
    [data]
  )

  const getTrainingDuration = React.useCallback(
    (time: number, resource: number) => {
      const tr = getTraining(time, resource)

      const startTime = tr?.startTime || 0
      const endTime = tr?.endTime || 0

      const hiddenLength = hiddenTimes.filter(ht => ht >= startTime && ht <= endTime).length

      return endTime - startTime - hiddenLength
    },
    [getTraining, hiddenTimes]
  )

  const isResourceOccupied = React.useCallback(
    (time: number, resource: number) => {
      const tr = getTraining(time, resource)

      const ts = filteredTimes.filter(t => t.id >= tr?.startTime! && t.id <= tr?.endTime!)
      const isFirst = ts[0]?.id === time

      return (tr && !isFirst)
    },
    [getTraining, filteredTimes]
  )

  return (
    <Paper>
      <Toolbar />
      <Divider />
      <Table>
        <TableHead>
          <TableRow>
            <TableCell className={classes.timeTd}>
              <Typography>
                {'Время'}
              </Typography>
              {
                getHiddenTimes(0, filteredTimes[0].id).map((ht, index) => (
                  <TimeFab time={ht} key={ht?.id} index={index} onClick={showTime} />
                ))
              }
            </TableCell>
            <TrainerHeaderCell />
            {
              resources.map(r => (
                <TableCell key={r.id} align='center' padding='none' className={classes.resourceTd}>
                  <Button>
                    <Tooltip rows={[r.name]}>
                      <Avatar className={classes.avatarBackground}>
                        {r.shortName}
                      </Avatar>
                    </Tooltip>
                  </Button>
                </TableCell>
              ))
            }
          </TableRow>
        </TableHead>
        <TableBody>
          {
            filteredTimes
              .map((time, index, arr) => (
                <TableRow key={time.id}>
                  <TableCell padding='none' className={classes.timeTd}>
                    <Typography>
                      {time.label}
                    </Typography>
                    {
                      time.isHideable && (
                        <OpenedTimeFab time={time} onClick={hideTime} />
                      )
                    }
                    {
                      getHiddenTimes(time.id, arr[index + 1]?.id).map((ht, index) => (
                        <TimeFab time={ht} key={ht?.id} index={index} onClick={showTime} />
                      ))
                    }
                  </TableCell>
                  <TrainerBodyCell key={time.id} time={time.id} getTrainingsCount={getTrainingsCount} />
                  {
                    loading && time === times[0] ? (
                      <TableCell align='center' padding='none' colSpan={resources.length} rowSpan={times.length}>
                        <CircularProgress />
                      </TableCell>
                    ) : null
                  }
                  {
                    !loading && resources.map(r =>
                      isResourceOccupied(time.id, r.id)
                        ? null
                        : (
                          <TrainingCell
                            id={getTraining(time.id, r.id)?._id}
                            resource={r.id}
                            time={time.id}
                            key={r.id}
                            duration={getTrainingDuration(time.id, r.id)}
                          />
                        )
                    )
                  }
                </TableRow>
              ))
          }
        </TableBody>
      </Table>
      <TrainingDialog />
    </Paper>
  )
}

export default SchedulePage
