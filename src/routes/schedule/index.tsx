import React from 'react'

import Paper from '@material-ui/core/Paper'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import Divider from '@material-ui/core/Divider'
import CircularProgress from '@material-ui/core/CircularProgress'
import Avatar from '@material-ui/core/Avatar'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'

import Tooltip from 'components/multiline-tooltip'

import times from 'data/times'

import AddTrainerDialog from './add-trainer-dialog'
import TrainingDialog from './training-dialog'
import CheckDialog from './check-dialog'

import Toolbar from './toolbar'
import TrainingCell from './training-cell'
import { TrainerHeaderCell, TrainerBodyCell } from './trainer-cell'
import TableCell from './table-cell'

import useGetTrainingResourcesQuery from './queries/get-training-resources'
import useGetSchedulesQuery from './queries/get-schedules'
import useGetGymsQuery from './queries/get-gyms'

import { useSelector, useActions } from 'store'

import useStyles from './styles'

const SchedulePage = () => {
  const classes = useStyles()
  const actions = useActions()

  const trainingResources = useGetTrainingResourcesQuery()
  const schedules = useGetSchedulesQuery()
  const gyms = useGetGymsQuery()
  const activeResources = useSelector(state => state.schedule.page.activeResources)
  const activeTime = useSelector(state => state.schedule.page.activeTime)

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

  React.useEffect(
    () => {
      actions.schedule.page.checkActiveTime()
    },
    [actions]
  )

  return (
    <Paper className={classes.rootPaper}>
      <Toolbar />
      <Divider />
      <Table stickyHeader={true}>
        <TableHead>
          <TableRow>
            <TableCell className={classes.timeTd} secondaryRow={true}>
              <Typography>
                {'Время'}
              </Typography>
            </TableCell>
            <TrainerHeaderCell />
            {
              resources
                .map((r, resourseIndex) => (
                  <TableCell key={r._id} align='center' padding='none' secondaryRow={true} secondaryCol={resourseIndex === 0} primaryCol={resourseIndex > 0}>
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
            {resources.length === 0 && <TableCell secondaryRow={true} secondaryCol={true} />}
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
                          <TableCell className={classes.timeTd} rowSpan={2} primaryRow={true} activeRow={time.id === activeTime - 2}>
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
                        !schedules.loading && <TrainerBodyCell key={time.id} time={time.id} trainers={trainers} primaryRow={!!(index % 2)} activeRow={time.id === activeTime - 1} />
                      }

                      {
                        trainingResources.loading && index === 0 ? (
                          <TableCell align='center' padding='none' colSpan={activeResources.length} rowSpan={times.length} secondaryCol={true}>
                            <CircularProgress />
                          </TableCell>
                        ) : null
                      }
                      {
                        !trainingResources.loading && resources
                          .map((r, resourseIndex) => (
                            <TrainingCell
                              resource={r._id}
                              time={time.id}
                              key={r._id}
                              secondaryRow={resourseIndex === 0}
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
      <CheckDialog />
      <AddTrainerDialog />
    </Paper>
  )
}

export default SchedulePage
