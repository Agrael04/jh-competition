import React from 'react'
import { useSelector } from 'store'
import { useMutation } from '@apollo/react-hooks'
import { loader } from 'graphql.macro'

import { updateQuery, removeUpdater } from 'utils/apollo-cache-updater'

const DELETE_POSITION = loader('./mutation.gql')
const GET_CONTACT_DETAILS = loader('../get-contact-details/query.gql')

const useDeleteCheckPosition = () => {
  const [mutation] = useMutation(DELETE_POSITION)
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
