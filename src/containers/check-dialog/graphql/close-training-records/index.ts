import { useCallback } from 'react'
import { loader } from 'graphql.macro'
import { useMutation } from '@apollo/react-hooks'

import { useSelector } from 'store'

import { updateQuery } from 'utils/apollo-cache-updater'

import { useGetContactDetailsQuery, IGetContactDetails } from '../get-contact-details'

const MUTATION = loader('./mutation.gql')
const GET_CONTACT_DETAILS = loader('../get-contact-details/query.gql')

const useCloseTrainingRecords = () => {
  const [updateTrainingRecord] = useMutation(MUTATION)

  const variables = useSelector(state => ({
    date: state.checkDialog.params.activeDate,
    gym: state.checkDialog.params.activeGym,
    _id: state.checkDialog.params.contact?.link,
  }))

  const query = useGetContactDetailsQuery()

  const mutate = useCallback(
    (balanceDiff: number) => {
      const balance = (query.data?.client.balance || 0) + balanceDiff

      return updateTrainingRecord({
        variables: {
          ...variables,
          data: {
            status: balance < 0 ? 'CLOSED_DEBT' : 'CLOSED',
          },
          balance,
        },
        update: (client, { data }) => {
          const boundUpdateCachedQuery = updateQuery(client)
          const updater = (data: IGetContactDetails) => {
            return ({
              ...data,
              trainingRecords: data.trainingRecords.map(tr => ({
                ...tr,
                status: balance < 0 ? 'CLOSED_DEBT' : 'CLOSED',
              })),
              client: {
                ...data.client,
                balance,
              },
            })
          }

          boundUpdateCachedQuery({
            query: GET_CONTACT_DETAILS,
            variables,
            updater,
          })
        },
      })
    },
    [updateTrainingRecord, variables, query]
  )

  return mutate
}

export default useCloseTrainingRecords
