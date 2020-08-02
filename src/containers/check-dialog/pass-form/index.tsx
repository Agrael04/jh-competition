import React from 'react'
import { loader } from 'graphql.macro'

import { useSelector, useActions } from 'store'

import PassForm from 'containers/pass-form'

import { DataProxy } from 'apollo-cache'
import { updateQuery, createUpdater } from 'utils/apollo-cache-updater'

import { products } from '../data'
import { passTypes, getSizes } from 'data/training-passes'

import useGetContactDetailsQuery from '../graphql/get-contact-details'
const GET_TRAINING_PASSES = loader('../graphql/get-training-passes/query.gql')

export default function PassFormWrap() {
  const { data } = useGetContactDetailsQuery()
  const actions = useActions()
  const variables = useSelector(state => ({
    _id: state.checkDialog.params.contact?.link,
  }))
  const { contact, activeDate, opened, service, serviceType } = useSelector(state => ({
    contact: state.checkDialog.params.contact?.link,
    activeDate: state.checkDialog.params.activeDate,
    opened: state.checkDialog.openedPassForm,
    serviceType: state.checkDialog.positionForm?.position?.type,
    service: state.checkDialog.positionForm?.position?.service,
  }))
  const close = actions.checkDialog.closePassForm

  const mode = opened ? 'create' : null

  const initialForm = React.useMemo(
    () => {
      const form = {
        contact: contact ? { link: contact } : null,
        createdAt: activeDate,
        isActive: true,
      }

      if (serviceType === 'pass' && service) {
        const p: any = products.find(p => p.id === 'pass')?.options.find(o => o.id === service)!

        if (p.type === 'open') {
          return form
        }

        const passType = passTypes.find(t => t.value === p.type)!
        const passSize = getSizes(p.type)!.find(s => s.value === p.size)!

        return ({
          ...form,
          type: p.type,
          size: p.size,
          duration: passType.duration,
          activation: passType.activation,
          capacity: passSize.capacity,
          price: passSize.price,
        })
      }

      return form
    }, [contact, activeDate, service, serviceType]
  )

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
