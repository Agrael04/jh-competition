import React from 'react'

import Dialog from '@material-ui/core/Dialog'
import Box from '@material-ui/core/Box'
import { loader } from 'graphql.macro'

import { useSelector, useActions } from 'store'

import PassForm from 'containers/pass-form'

import { DataProxy } from 'apollo-cache'

import Header from './header'
import { updateQuery, createUpdater } from 'utils/apollo-cache-updater'

const GET_TRAINING_PASSES = loader('../graphql/get-training-passes/query.gql')

export default function PassFormWrap() {
  const actions = useActions()
  const opened = useSelector(state => state.passForm.opened)
  const initialFilter = useSelector(state => state.passForm.initialFilter)

  const updateCacheOnCreate = (client: DataProxy, { data }: any) => {
    const boundUpdateCachedQuery = updateQuery(client)
    const updater = createUpdater('trainingPasss', data.insertOneTrainingPass)

    boundUpdateCachedQuery({
      query: GET_TRAINING_PASSES,
      updater,
    })
  }

  const close = () => {
    actions.passForm.close()
  }

  return (
    <Dialog open={opened} onClose={close} maxWidth='sm' fullWidth={true}>
      <Header />
      <Box padding={3}>
        <PassForm
          initialContactFilter={initialFilter}
          updateCacheOnCreate={updateCacheOnCreate}
        />
      </Box>
    </Dialog>
  )
}
