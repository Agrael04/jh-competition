import React, { useCallback } from 'react'

import { useActions, useSelector } from 'store'

import useGetContactDetailsQuery from '../graphql/get-contact-details'

import PassForm from 'containers/pass-form'
import { updateCacheOnCreate } from '../graphql/create-training-pass'

import getClientLabel from 'utils/get-client-label'

export default function PaymentBlock() {
  const actions = useActions()
  const passForm = useSelector(state => state.checkDialog.passForm)

  const { data } = useGetContactDetailsQuery()

  const variables = useSelector(state => ({
    _id: state.checkDialog.params.contact?.link,
  }))

  const closePassForm = useCallback(
    () => {
      actions.checkDialog.closePassForm()
    }, [actions]
  )

  const boundUpdateCacheOnCreate = updateCacheOnCreate(variables)

  if (passForm.isActive) {
    return (
      <PassForm
        mode='create'
        initialForm={passForm.defaultValues || null}
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

  return (
    null
  )
}
