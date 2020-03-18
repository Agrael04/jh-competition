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

import { useSelector } from 'store'
import { times, resources } from './data'

import TrainingDialog from './training-dialog'

import Toolbar from './toolbar'
import TrainingCell from './training-cell'
import { TrainerHeaderCell, TrainerBodyCell } from './trainer-cell'

import GET_TRAININGS, { IGetTrainingsResponse } from './queries/get-trainings'

import useStyles from './styles'

const hideableTimes = [
  '8:00', '8:30', '9:00', '9:30', '10:30', '11:30', '12:30', '13:30', '14:30', '15:30', '16:30', '17:30', '18:30', '19:30', '21:00', '21:30',
]

const isHideable = (time: string) => !!hideableTimes.find(ht => ht === time)

const TimeFab = ({ time, onClick, index }: { time: string, index: number, onClick: (time: string) => void }) => {
  const classes = useStyles()
  const boundOnClick = React.useCallback(
    () => onClick(time),
    [onClick, time]
  )

  return (
    <Fab onClick={boundOnClick} className={classes.toggleHiddenTime} color='secondary' size='small' style={{ left: -40 + index * 56 }}>
      <Typography variant='caption'>
        {time}
      </Typography>
    </Fab>
  )
}

const OpenedTimeFab = ({ time, onClick }: { time: string, onClick: (time: string) => void }) => {
  const classes = useStyles()
  const boundOnClick = React.useCallback(
    () => onClick(time),
    [onClick, time]
  )

  return (
    <Fab onClick={boundOnClick} className={classes.toggleOpenedTime} color='secondary' size='small'>
      <UnfoldLess />
    </Fab>
  )
}

const SchedulePage = () => {
  const classes = useStyles()
  const date = useSelector(state => state.schedule.currentDate)
  const [hiddenTimes, setHiddenTimes] = React.useState(hideableTimes)

  const { data, loading } = useQuery<IGetTrainingsResponse>(GET_TRAININGS, {
    variables: { date },
  })

  const filteredTimes = React.useMemo(
    () => {
      return times.filter(time => !hiddenTimes.find(t => t === time))
    },
    [hiddenTimes]
  )

  const showTime = React.useCallback(
    (time: string) => {
      setHiddenTimes(times => times.filter(t => t !== time))
    },
    [setHiddenTimes]
  )

  const hideTime = React.useCallback(
    (time: string) => {
      setHiddenTimes(times => [...times, time].sort((a, b) => {
        const aTime = a.length === 4 ? `0${a}` : a
        const bTime = b.length === 4 ? `0${b}` : b

        return aTime > bTime ? 1 : -1
      }))
    },
    [setHiddenTimes]
  )

  const getHiddenTimes = React.useCallback(
    (from: string, to: string) => {
      const fromTime = from.length === 4 ? `0${from}` : from
      const toTime = to.length === 4 ? `0${to}` : to

      return hiddenTimes.filter(ht => {
        const time = ht.length === 4 ? `0${ht}` : ht

        return time > fromTime && time < toTime
      })
    },
    [hiddenTimes]
  )

  const getTrainingsCount = React.useCallback(
    (time: string) => (trainer: number) => {
      return data?.trainings.filter(tr => tr?.time === time && tr?.trainer === trainer).length
    },
    [data]
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
                getHiddenTimes('', filteredTimes[0]).map((ht, index) => (
                  <TimeFab time={ht} key={ht} index={index} onClick={showTime} />
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
                <TableRow key={time}>
                  <TableCell padding='none' className={classes.timeTd}>
                    <Typography>
                      {time}
                    </Typography>
                    {
                      isHideable(time) && (
                        <OpenedTimeFab time={time} onClick={hideTime} />
                      )
                    }
                    {
                      getHiddenTimes(time, arr[index + 1] || '22:00').map((ht, index) => (
                        <TimeFab time={ht} key={ht} index={index} onClick={showTime} />
                      ))
                    }
                  </TableCell>
                  <TrainerBodyCell key={time} time={time} getTrainingsCount={getTrainingsCount} />
                  {
                    loading && time === times[0] ? (
                      <TableCell align='center' padding='none' colSpan={resources.length} rowSpan={times.length}>
                        <CircularProgress />
                      </TableCell>
                    ) : null
                  }
                  {
                    !loading && resources.map(r => (
                      <TrainingCell
                        id={data?.trainings.find(tr => tr?.time === time && tr?.resource === r.id)?._id}
                        resource={r.id}
                        time={time}
                        key={r.id}
                      />
                    ))
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
