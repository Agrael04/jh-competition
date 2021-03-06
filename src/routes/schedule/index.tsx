import { useEffect } from 'react'

import Paper from '@material-ui/core/Paper'
import Divider from '@material-ui/core/Divider'
import Grid from '@material-ui/core/Grid'
import Box from '@material-ui/core/Box'
import CircularProgress from '@material-ui/core/CircularProgress'

import CheckDialog from 'containers/check-dialog'

import AddTrainerDialog from './add-trainer-dialog'
import TrainingDialog from './training-dialog'

import Header from './header'
import Table from './table'
import FiltersDialog from './filters-dialog'

import { useDispatch } from 'store'
import { checkActiveTime } from 'store/ui/pages/schedule/page/actions'

import useGetGymsQuery from './queries/get-gyms'

import useStyles from './styles'

const SchedulePage = () => {
  const classes = useStyles()
  const dispatch = useDispatch()

  const { loading } = useGetGymsQuery()

  useEffect(
    () => {
      dispatch(checkActiveTime())
    },
    []
  )

  return (
    <Paper className={classes.rootPaper}>
      {
        loading && (
          <Grid container={true} className={classes.loaderWrap}>
            <Box margin='auto'>
              <CircularProgress />
            </Box>
          </Grid>
        )
      }
      {
        !loading && (
          <>
            <Header />
            <Divider />
            <Table />
            <TrainingDialog />
            <CheckDialog />
            <AddTrainerDialog />
            <FiltersDialog />
          </>
        )
      }
    </Paper>
  )
}

export default SchedulePage
