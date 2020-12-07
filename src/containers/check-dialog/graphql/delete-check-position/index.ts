import { useCallback } from 'react'
import { useMutation } from '@apollo/react-hooks'
import { loader } from 'graphql.macro'

import { useSelector } from 'store'

import { updateQuery, removeUpdater } from 'utils/apollo-cache-updater'

const DELETE_POSITION = loader('./mutation.gql')
const GET_CONTACT_DETAILS = loader('../get-contact-details/query.gql')

const useDeleteCheckPosition = () => {
  const [mutation] = useMutation(DELETE_POSITION)
  const variables = useSelector(state => ({
    date: state.checkDialog.params.activeDate,
    gym: state.checkDialog.params.activeGym,
    _id: state.checkDialog.params.contact?.link,
  }))

  const mutate = useCallback(
    (_id: string) => {
      if (!_id) {
        return
      }

      return mutation({
        variables: { _id },
        update: (client, { data }) => {
          const boundUpdateCachedQuery = updateQuery(client)
          const updater = removeUpdater('checkPositions', data.deleteOneCheckPosition)

          boundUpdateCachedQuery({
            query: GET_CONTACT_DETAILS,
            variables,
            updater,
          })
        },
      })
    },
    [
      mutation,
      variables,
    ]
  )

  return mutate
}

export default useDeleteCheckPosition
