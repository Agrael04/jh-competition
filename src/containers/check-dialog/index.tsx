import { useSelector, useDispatch } from 'store'

import Dialog from '@material-ui/core/Dialog'

import Grid from '@material-ui/core/Grid'
import Box from '@material-ui/core/Box'
import CircularProgress from '@material-ui/core/CircularProgress'

import actions from 'store/ui/dialogs/check-dialog/actions'

import Header from './header'
import ParamsBlock from './params-block'
import PaymentsBlock from './payments-block'
import PositionsBlock from './positions-block'
import PassBlock from './pass-block'
import RecordsBlock from './records-block'
import TotalBlock from './total-block'

import useGetContactDetails from './graphql/get-contact-details'

export default function CheckDialog() {
  const dispatch = useDispatch()
  const { loading } = useGetContactDetails()

  const opened = useSelector(state => state.ui.dialogs.checkDialog.opened)

  const close = () => dispatch(actions.closeDialog())

  return (
    <Dialog open={opened} maxWidth='lg' fullWidth={true} onClose={close}>
      <Header />
      <Box padding={3}>
        <Grid container={true} spacing={3}>
          {
            !loading ? (
              <>
                <ParamsBlock />
                <Grid item={true} lg={12}>
                  <Box border={1} borderColor='primary.main' width={1} />
                </Grid>
                <RecordsBlock />
                <Grid item={true} lg={12}>
                  <Box border={1} borderColor='primary.main' width={1} />
                </Grid>
                <Grid item={true} lg={4} container={true} justify='space-between' direction='column'>
                  <PositionsBlock />
                </Grid>
                <Grid item={true} lg={4} container={true} justify='space-between' direction='column'>
                  <PaymentsBlock />
                </Grid>
                <Grid item={true} lg={4}>
                  <PassBlock />
                </Grid>
                <Grid item={true} lg={12}>
                  <Box border={1} borderColor='primary.main' width={1} />
                </Grid>
                <TotalBlock />
              </>
            ) : (
                <Grid container={true}>
                  <Box margin='auto'>
                    <CircularProgress />
                  </Box>
                </Grid>
              )
          }
        </Grid>
      </Box>
    </Dialog>
  )
}
