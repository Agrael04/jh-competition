import React from 'react'
import { useSelector } from 'store'
import { useMutation } from '@apollo/react-hooks'
import { loader } from 'graphql.macro'

import { updateQuery, createUpdater } from 'utils/apollo-cache-updater'

const CREATE_PAYMENT = loader('./mutation.gql')
const GET_CONTACT_DETAILS = loader('../get-contract-details/query.gql')

const useCreateTrainingPass = () => {
  const [createPayment] = useMutation(CREATE_PAYMENT)
  const variables = useSelector(state => ({
    date: state.schedule.page.activeDate,
    gym: state.schedule.page.activeGym,
    _id: state.checkDialog.contact,
  }))

  const { data } = useSelector(state => ({
    data: state.checkDialog.paymentForm,
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
        },
      })
    },
    [createPayment, data, variables]
  )

  return mutate
}

export default useCreateTrainingPass
