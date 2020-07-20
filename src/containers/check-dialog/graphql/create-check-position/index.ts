import React from 'react'
import { useMutation } from '@apollo/react-hooks'
import { loader } from 'graphql.macro'

import { useSelector } from 'store'

import { updateQuery, createUpdater } from 'utils/apollo-cache-updater'

import { ICheckPositionForm } from 'interfaces/check-position'

const CREATE_POSITION = loader('./mutation.gql')
const GET_CONTACT_DETAILS = loader('../get-contact-details/query.gql')

const useCreateCheckPosition = () => {
  const [mutation] = useMutation(CREATE_POSITION)
  const variables = useSelector(state => ({
    date: state.checkDialog.params.activeDate,
    gym: state.checkDialog.params.activeGym,
    _id: state.checkDialog.params.contact?.link,
  }))

  const mutate = React.useCallback(
    (data: Partial<ICheckPositionForm>) => {
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
      variables,
    ]
  )

  return mutate
}

export default useCreateCheckPosition
