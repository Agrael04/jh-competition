import React from 'react'

import { useQuery } from '@apollo/react-hooks'

import Grid from '@material-ui/core/Grid'
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
import Box from '@material-ui/core/Box'

import Tooltip from 'components/multiline-tooltip'

import { useSelector } from 'store'
import { times, resources, trainerSchedule, trainers } from './data'

import TrainingDialog from './components/training-dialog'

import Toolbar from './toolbar'
import TrainerAvatar from './trainer-avatar'
import TrainingCell from './training-cell'

import GET_TRAININGS from './queries/get-trainings'
import { GetTrainingsQuery } from 'generated/graphql'

import useStyles from './styles'

const mappedTrainerSchedule = trainerSchedule.map(ts => ({
  times: ts.times,
  trainer: trainers.find(tr => tr.id === ts.id),
}))

const SchedulePage = () => {
  const classes = useStyles()
  const date = useSelector(state => state.schedule.currentDate)

  const { data, loading } = useQuery<GetTrainingsQuery>(GET_TRAININGS, {
    variables: { date },
  })

  return (
    <Paper>
      <Toolbar />
      <Divider />
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>{'Время'}</TableCell>
            <TableCell>{'Тренера'}</TableCell>
            {
              resources.map(r => (
                <TableCell key={r.id} align='center' padding='none'>
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
            times.map((time, index) => (
              <TableRow key={time}>
                <TableCell padding='none'>
                  <Box paddingLeft={2}>
                    {time}
                  </Box>
                </TableCell>
                <TableCell padding='none'>
                  <Grid container={true}>
                    {
                      mappedTrainerSchedule.filter(ts => ts.times.find(t => t === time)).map(ts => (
                        <TrainerAvatar
                          time={time}
                          trainer={ts.trainer}
                          key={ts.trainer?.id}
                          count={data?.trainings.filter(tr => tr?.time === time && tr?.trainer === ts.trainer?.id).length}
                        />
                      ))
                    }
                  </Grid>
                </TableCell>
                {
                  resources.map(r => (
                    loading ? (
                      <TableCell align='center' padding='none' key={r.id}>
                        <CircularProgress />
                      </TableCell>
                    ) : (
                        <TrainingCell
                          id={data?.trainings.find(tr => tr?.time === time && tr?.resource === r.id)?._id}
                          resource={r.id}
                          time={time}
                          key={r.id}
                        />
                      )
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
