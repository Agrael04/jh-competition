import React from 'react'
import { useMutation } from '@apollo/react-hooks'
import { loader } from 'graphql.macro'

import { useSelector } from 'store'

import { IPaymentForm } from 'interfaces/payment'

import { updateQuery, createUpdater } from 'utils/apollo-cache-updater'

const CREATE_PAYMENT = loader('./mutation.gql')
const GET_CONTACT_DETAILS = loader('../get-contact-details/query.gql')
const GET_TRAINING_PASSES = loader('../get-training-passes/query.gql')

const useCreatePayment = () => {
  const [createPayment] = useMutation(CREATE_PAYMENT)
  const variables = useSelector(state => ({
    date: state.checkDialog.params.activeDate,
    gym: state.checkDialog.params.activeGym,
    _id: state.checkDialog.params.contact?.link,
  }))

  const mutate = React.useCallback(
    (data: Partial<IPaymentForm>) => {
      if (!data) {
        return
      }

      return createPayment({
        variables: { data },
        update: (client, { data }) => {
          const boundUpdateCachedQuery = updateQuery(client)
          const updater = createUpdater('payments', data.insertOnePayment)

          boundUpdateCachedQuery({
            query: GET_CONTACT_DETAILS,
            variables,
            updater,
          })

          boundUpdateCachedQuery({
            query: GET_TRAINING_PASSES,
            variables: { _id: variables._id },
            updater,
          })
        },
      })
    },
    [createPayment, variables]
  )

  return mutate
}

export default useCreatePayment
