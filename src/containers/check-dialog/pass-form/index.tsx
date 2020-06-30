import React from 'react'
import { loader } from 'graphql.macro'

import PassForm from 'containers/pass-form'

import { DataProxy } from 'apollo-cache'
import { updateQuery, createUpdater } from 'utils/apollo-cache-updater'

import { products } from '../data'
import { passTypes, getSizes } from 'data/training-passes'

import { useContext } from '../context'

import useGetContactDetailsQuery from '../graphql/get-contact-details'
const GET_TRAINING_PASSES = loader('../graphql/get-training-passes/query.gql')

export default function PassFormWrap() {
  const { data } = useGetContactDetailsQuery()
  const variables = useContext(s => ({
    _id: s.state?.params.contact?.link,
  }))
  const { contact, activeDate, opened, service, serviceType, close } = useContext(s => ({
    contact: s.state?.params.contact?.link,
    activeDate: s.state?.params.activeDate,
    opened: s.state?.openedPassForm,
    serviceType: s.state.positionForm?.type,
    service: s.state.positionForm?.service,
    close: s.actions.closePassForm,
  }))

  const mode = opened ? 'create' : null

  const initialForm = React.useMemo(
    () => {
      const form = {
        contact: contact ? { link: contact } : null,
        createdAt: activeDate,
        isActive: true,
      }

      if (serviceType === 'pass' && (service || service === 0)) {
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
