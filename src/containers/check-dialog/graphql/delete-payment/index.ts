import React from 'react'
import { useSelector } from 'store'
import { useMutation } from '@apollo/react-hooks'
import { loader } from 'graphql.macro'

import { updateQuery, removeUpdater } from 'utils/apollo-cache-updater'

const DELETE_PAYMENT = loader('./mutation.gql')
const GET_CONTACT_DETAILS = loader('../get-contact-details/query.gql')
const GET_TRAINING_PASSES = loader('../get-training-passes/query.gql')

const useCreateTrainingPass = () => {
  const [createPayment] = useMutation(DELETE_PAYMENT)
  const variables = useSelector(state => ({
    date: state.schedule.page.activeDate,
    gym: state.schedule.page.activeGym,
    _id: state.checkDialog.contact,
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
