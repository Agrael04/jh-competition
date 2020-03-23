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
import Typography from '@material-ui/core/Typography'

import Tooltip from 'components/multiline-tooltip'

import { useSelector } from 'store'
import { times, resources } from './data'

import TrainingDialog from './training-dialog'

import Toolbar from './toolbar'
import TrainingCell from './training-cell'
import { TrainerHeaderCell, TrainerBodyCell } from './trainer-cell'

import GET_TRAININGS, { IGetTrainingsResponse } from './queries/get-trainings'

import useStyles from './styles'

const SchedulePage = () => {
  const classes = useStyles()
  const date = useSelector(state => state.schedule.currentDate)
  const gym = useSelector(state => state.schedule.currentGym)

  const { data, loading } = useQuery<IGetTrainingsResponse>(GET_TRAININGS, {
    variables: { date, gym },
  })

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

      return endTime - startTime
    },
    [getTraining]
  )

  const isResourceOccupied = React.useCallback(
    (time: number, resource: number) => {
      const tr = getTraining(time, resource)

      const ts = times.filter(t => t.id >= tr?.startTime! && t.id <= tr?.endTime!)
      const isFirst = ts[0]?.id === time

      return (tr && !isFirst)
    },
    [getTraining]
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
            times
              .map((time, index, arr) => (
                <TableRow key={time.id}>
                  {
                    index % 2 === 0 && (
                      <TableCell padding='none' className={classes.timeTd} rowSpan={2}>
                        <Typography>
                          {time.label}
                        </Typography>
                      </TableCell>
                    )
                  }
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
          <TableRow>
            <TableCell className={classes.timeTd} colSpan={2 + resources.length}>
              <Typography>
                22:00
              </Typography>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
      <TrainingDialog />
    </Paper>
  )
}

export default SchedulePage
