import { useCallback } from 'react'
import { useMutation } from '@apollo/react-hooks'
import { loader } from 'graphql.macro'
import moment from 'moment'

import { useSelector } from 'store'

import { IPaymentForm } from 'interfaces/payment'

import { updateQuery, createUpdater } from 'utils/apollo-cache-updater'

const CREATE_PAYMENT = loader('./mutation.gql')
const GET_CONTACT_DETAILS = loader('../get-contact-details/query.gql')
const GET_TRAINING_PASSES = loader('../get-training-passes/query.gql')

const useCreatePayment = () => {
  const [mutation] = useMutation(CREATE_PAYMENT)
  const variables = useSelector(state => ({
    date: state.ui.dialogs.checkDialog.params.activeDate,
    gym: state.ui.dialogs.checkDialog.params.activeGym,
    _id: state.ui.dialogs.checkDialog.params.contact?.link,
  }))

  const mutate = useCallback(
    (form: Partial<IPaymentForm>) => {
      const data = ({
        ...form,
        contact: { link: variables._id },
        date: moment(variables.date).toDate(),
        gym: { link: variables.gym },
        status: 'PENDING',
      })

      return mutation({
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
    [mutation, variables]
  )

  return mutate
}

export default useCreatePayment
