import React from 'react'
import { useMutation } from '@apollo/react-hooks'
import { loader } from 'graphql.macro'

import { useSelector } from 'store'

import { updateQuery, createUpdater } from 'utils/apollo-cache-updater'

const CREATE_POSITION = loader('./mutation.gql')
const GET_CONTACT_DETAILS = loader('../get-contact-details/query.gql')

const useCreateCheckPosition = () => {
  const [mutation] = useMutation(CREATE_POSITION)
  const variables = useSelector(state => ({
    date: state.checkDialog.params.activeDate,
    gym: state.checkDialog.params.activeGym,
    _id: state.checkDialog.params.contact?.link,
  }))

  const { data } = useSelector(state => ({
    data: state.checkDialog.positionForm,
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
