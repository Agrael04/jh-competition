import React from 'react'
import { loader } from 'graphql.macro'

import { useSelector, useActions } from 'store'

import PassForm from 'containers/pass-form'

import { DataProxy } from 'apollo-cache'
import { updateQuery, createUpdater } from 'utils/apollo-cache-updater'

import useGetContactDetailsQuery from '../graphql/get-contract-details'
const GET_TRAINING_PASSES = loader('../graphql/get-training-passes/query.gql')

export default function PassFormWrap() {
  const actions = useActions()
  const { data } = useGetContactDetailsQuery()
  const variables = useSelector(state => ({
    _id: state.checkDialog.contact,
  }))
  const opened = useSelector(state => state.checkDialog.openedPassForm)
  const { contact, activeDate } = useSelector(state => ({
    contact: state.checkDialog.contact,
    activeDate: state.schedule.page.activeDate,
  }))

  const mode = opened ? 'create' : null
  const initialForm = {
    contact: contact ? { link: contact } : null,
    createdAt: activeDate,
    isActive: true,
  }
  const close = () => {
    actions.checkDialog.closePass()
  }

  const updateCacheOnCreate = (client: DataProxy, { data }: any) => {
    const boundUpdateCachedQuery = updateQuery(client)
    const updater = createUpdater('trainingPasss', data.insertOneTrainingPass)

    boundUpdateCachedQuery({
      query: GET_TRAINING_PASSES,
      variables,
      updater,
    })
  }

  return (
    <PassForm
      mode={mode}
      initialForm={initialForm}
      close={close}

      disabledOpenType={true}
      disabledContact={true}
      disabledCreatedAt={true}
      disabledCapacity={true}
      disabledPrice={true}
      disabledActivation={true}
      disabledDuration={true}
      initialContactFilter={data?.user.fullName || ''}
      updateCacheOnCreate={updateCacheOnCreate}
    />
  )
}
