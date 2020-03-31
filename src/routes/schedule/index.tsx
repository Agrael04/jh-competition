import React from 'react'
import clsx from 'clsx'

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

import { times, resources } from './data'

import AddTrainerDialog from './add-trainer-dialog'
import TrainingDialog from './training-dialog'

import Toolbar from './toolbar'
import TrainingCell from './training-cell'
import { TrainerHeaderCell, TrainerBodyCell } from './trainer-cell'

import useGetTrainingsQuery from './queries/get-trainings'
import useGetSchedulesQuery from './queries/get-schedules'

import useStyles from './styles'

const SchedulePage = () => {
  const classes = useStyles()

  const trainings = useGetTrainingsQuery()
  const schedules = useGetSchedulesQuery()

  /* another graphql request */
  const trainers = React.useMemo(
    () => {
      return schedules?.data?.trainerSchedules.map(t => t.trainer).filter((tr, index, arr) => arr.indexOf(tr) === index) || []
    },
    [schedules]
  )

  return (
    <Paper>
      <Toolbar />
      <Divider />
      <Table>
        <TableHead>
          <TableRow className={classes.secondaryRow}>
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
                arr.length - 1 === index
                  ? (
                    <TableRow key={time.id} className={clsx(time.id % 2 === 0 && classes.secondaryRow)}>
                      <TableCell className={classes.timeTd} colSpan={2 + resources.length}>
                        <Typography>
                          {time.label}
                        </Typography>
                      </TableCell>
                    </TableRow>
                  ) : (
                    <TableRow key={time.id} className={clsx(time.id % 2 === 0 && classes.secondaryRow)}>
                      {
                        index % 2 === 0 && (
                          <TableCell padding='none' className={clsx(classes.timeTd, classes.secondaryTimeTd)} rowSpan={2}>
                            <Typography>
                              {time.label}
                            </Typography>
                          </TableCell>
                        )
                      }
                      {
                        schedules.loading && index === 0 ? (
                          <TableCell align='center' padding='none' rowSpan={times.length}>
                            <CircularProgress />
                          </TableCell>
                        ) : null
                      }

                      {
                        !schedules.loading && <TrainerBodyCell key={time.id} time={time.id} trainers={trainers} />
                      }

                      {
                        trainings.loading && index === 0 ? (
                          <TableCell align='center' padding='none' colSpan={resources.length} rowSpan={times.length}>
                            <CircularProgress />
                          </TableCell>
                        ) : null
                      }
                      {
                        !trainings.loading && resources.map(r => (
                          <TrainingCell
                            resource={r.id}
                            time={time.id}
                            key={r.id}
                          />
                        ))
                      }
                    </TableRow>
                  )
              ))
          }
        </TableBody>
      </Table>
      <TrainingDialog />
      <AddTrainerDialog />
    </Paper>
  )
}

export default SchedulePage
