import React from 'react'
import { useMutation } from '@apollo/react-hooks'
import { loader } from 'graphql.macro'

import { updateQuery, createUpdater } from 'utils/apollo-cache-updater'

import { useContext } from '../../context'

const CREATE_POSITION = loader('./mutation.gql')
const GET_CONTACT_DETAILS = loader('../get-contact-details/query.gql')

const useCreateCheckPosition = () => {
  const [mutation] = useMutation(CREATE_POSITION)
  const variables = useContext(s => ({
    date: s.state?.params.activeDate,
    gym: s.state?.params.activeGym,
    _id: s.state?.params.contact?.link,
  }))

  const { data } = useContext(s => ({
    data: s.state.positionForm,
  }))

  const mutate = React.useCallback(
    () => {
      if (!data) {
        return
      }

      return mutation({
        variables: { data },
        update: (client, { data }) => {
          const boundUpdateCachedQuery = updateQuery(client)
          const updater = createUpdater('checkPositions', data.insertOneCheckPosition)

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
      data,
      variables,
    ]
  )

  return mutate
}

export default useCreateCheckPosition
