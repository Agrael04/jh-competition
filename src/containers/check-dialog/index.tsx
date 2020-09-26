import React, { useCallback } from 'react'

import { useActions, useSelector } from 'store'

import Dialog from '@material-ui/core/Dialog'

import Grid from '@material-ui/core/Grid'
import Box from '@material-ui/core/Box'
import CircularProgress from '@material-ui/core/CircularProgress'

import Header from './header'
import ParamsBlock from './params-block'
import PaymentsBlock from './payments-block'
import PositionsBlock from './positions-block'
import RecordsBlock from './records-block'
import TotalBlock from './total-block'

import PassForm from 'containers/pass-form'

import getClientLabel from 'utils/get-client-label'

import useGetContactDetails from './graphql/get-contact-details'
import { updateCacheOnCreate } from './graphql/create-training-pass'

export default function CheckDialog() {
  const { loading, data } = useGetContactDetails()
  const actions = useActions()

  const opened = useSelector(state => state.checkDialog.opened)
  const passForm = useSelector(state => state.checkDialog.passForm)
  const variables = useSelector(state => ({
    _id: state.checkDialog.params.contact?.link,
  }))

  const closePassForm = useCallback(
    () => {
      actions.checkDialog.closePassForm()
    }, [actions]
  )

  const boundUpdateCacheOnCreate = updateCacheOnCreate(variables)

  return (
    <Dialog open={opened} maxWidth='lg' fullWidth={true}>
      <Header />
      <Box padding={3}>
        <Grid container={true} spacing={3}>
          <ParamsBlock />
          <Grid item={true} lg={12}>
            <Box border={1} borderColor='primary.main' width={1} />
          </Grid>

          {
            !loading ? (
              <>
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
                  {
                    passForm.active && (
                      <PassForm
                        mode={'create'}
                        initialForm={passForm.defaultValues}
                        close={closePassForm}

                        disabledOpenType={true}
                        disabledContact={true}
                        disabledCreatedAt={true}
                        disabledCapacity={true}
                        disabledPrice={true}
                        disabledActivation={true}
                        disabledDuration={true}
                        initialContactFilter={getClientLabel(data?.client)}
                        updateCacheOnCreate={boundUpdateCacheOnCreate}
                      />
                    )
                  }
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
