import React from 'react'
import { useMutation } from '@apollo/react-hooks'
import { loader } from 'graphql.macro'

import { updateQuery, createUpdater } from 'utils/apollo-cache-updater'

import { useContext } from '../../context'

const CREATE_PAYMENT = loader('./mutation.gql')
const GET_CONTACT_DETAILS = loader('../get-contact-details/query.gql')
const GET_TRAINING_PASSES = loader('../get-training-passes/query.gql')

const useCreateTrainingPass = () => {
  const [createPayment] = useMutation(CREATE_PAYMENT)
  const variables = useContext(s => ({
    date: s.state?.params.activeDate,
    gym: s.state?.params.activeGym,
    _id: s.state?.params.contact?.link,
  }))

  const { data } = useContext(s => ({
    data: s.state.paymentForm,
  }))

  const mutate = React.useCallback(
    () => {
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
    [createPayment, data, variables]
  )

  return mutate
}

export default useCreateTrainingPass
