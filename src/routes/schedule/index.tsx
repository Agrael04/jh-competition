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

import { times } from './data'

import AddTrainerDialog from './add-trainer-dialog'
import TrainingDialog from './training-dialog'

import Toolbar from './toolbar'
import TrainingCell from './training-cell'
import { TrainerHeaderCell, TrainerBodyCell } from './trainer-cell'

import useGetTrainingsQuery from './queries/get-trainings'
import useGetSchedulesQuery from './queries/get-schedules'
import useGetGymsQuery from './queries/get-gyms'

import { useSelector } from 'store'

import useStyles from './styles'

const SchedulePage = () => {
  const classes = useStyles()

  const trainings = useGetTrainingsQuery()
  const schedules = useGetSchedulesQuery()
  const gyms = useGetGymsQuery()
  const activeResources = useSelector(state => state.schedule.page.activeResources)

  /* another graphql request */
  const trainers = React.useMemo(
    () => {
      return schedules?.data?.trainerSchedules.map(t => t.trainer).filter((tr, index, arr) => arr.indexOf(tr) === index) || []
    },
    [schedules]
  )

  const resources = React.useMemo(
    () => {
      return activeResources
        .map(r => gyms.data?.resources.find(res => res._id === r)!)
    }, [gyms, activeResources]
  )

  return (
    <Paper className={classes.rootPaper}>
      <Toolbar />
      <Divider />
      <Table stickyHeader={true}>
        <TableHead>
          <TableRow>
            <TableCell className={clsx(classes.timeTd, classes.headerTd)}>
              <Typography>
                {'Время'}
              </Typography>
            </TableCell>
            <TrainerHeaderCell className={classes.headerTd} />
            {
              resources
                .map((r, resourseIndex) => (
                  <TableCell key={r._id} align='center' padding='none' className={clsx(resourseIndex === 0 ? classes.firstResourceTd : classes.resourceTd, classes.headerTd)}>
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
                    <TableRow key={time.id}>
                      <TableCell className={classes.timeTd} colSpan={2 + activeResources.length}>
                        <Typography>
                          {time.label}
                        </Typography>
                      </TableCell>
                    </TableRow>
                  ) : (
                    <TableRow key={time.id}>
                      {
                        index % 2 === 0 && (
                          <TableCell className={clsx(classes.timeTd, classes.secondaryTd)} rowSpan={2}>
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
                        !schedules.loading && <TrainerBodyCell key={time.id} time={time.id} trainers={trainers} className={clsx(index % 2 && classes.secondaryTd)} />
                      }

                      {
                        trainings.loading && index === 0 ? (
                          <TableCell align='center' padding='none' colSpan={activeResources.length} rowSpan={times.length} className={classes.firstResourceTd}>
                            <CircularProgress />
                          </TableCell>
                        ) : null
                      }
                      {
                        !trainings.loading && resources
                          .map((r, resourseIndex) => (
                            <TrainingCell
                              resource={r._id}
                              time={time.id}
                              key={r._id}
                              className={clsx(resourseIndex === 0 && classes.firstResourceTd)}
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
