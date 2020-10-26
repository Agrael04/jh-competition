import React from 'react'
import { useMutation } from '@apollo/react-hooks'
import { loader } from 'graphql.macro'

import { useSelector } from 'store'

import { updateQuery, removeUpdater } from 'utils/apollo-cache-updater'

const DELETE_PAYMENT = loader('./mutation.gql')
const GET_CONTACT_DETAILS = loader('../get-contact-details/query.gql')
const GET_TRAINING_PASSES = loader('../get-training-passes/query.gql')

const useCreateTrainingPass = () => {
  const [mutation] = useMutation(DELETE_PAYMENT)
  const variables = useSelector(state => ({
    date: state.checkDialog.params.activeDate,
    gym: state.checkDialog.params.activeGym,
    _id: state.checkDialog.params.contact?.link,
  }))

  const mutate = React.useCallback(
    (_id: string) => {
      if (!_id) {
        return
      }

      return mutation({
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
    [mutation, variables]
  )

  return mutate
}

export default useCreateTrainingPass
