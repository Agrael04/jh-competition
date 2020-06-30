import React from 'react'
import { useMutation } from '@apollo/react-hooks'
import { loader } from 'graphql.macro'

import { updateQuery, removeUpdater } from 'utils/apollo-cache-updater'

import { useContext } from '../../context'

const DELETE_PAYMENT = loader('./mutation.gql')
const GET_CONTACT_DETAILS = loader('../get-contact-details/query.gql')
const GET_TRAINING_PASSES = loader('../get-training-passes/query.gql')

const useCreateTrainingPass = () => {
  const [createPayment] = useMutation(DELETE_PAYMENT)
  const variables = useContext(s => ({
    date: s.state?.params.activeDate,
    gym: s.state?.params.activeGym,
    _id: s.state?.params.contact?.link,
  }))

  const mutate = React.useCallback(
    (_id: string) => {
      if (!_id) {
        return
      }

      return createPayment({
        variables: { _id },
        update: (client, { data }) => {
          const boundUpdateCachedQuery = updateQuery(client)
          const updater = removeUpdater('payments', data.deleteOnePayment)

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

export default useCreateTrainingPass
