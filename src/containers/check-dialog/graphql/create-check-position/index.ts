import React from 'react'
import { useSelector } from 'store'
import { useMutation } from '@apollo/react-hooks'
import { loader } from 'graphql.macro'

import { updateQuery, createUpdater } from 'utils/apollo-cache-updater'

const CREATE_POSITION = loader('./mutation.gql')
const GET_CONTACT_DETAILS = loader('../get-contract-details/query.gql')

const useCreateCheckPosition = () => {
  const [mutation] = useMutation(CREATE_POSITION)
  const variables = useSelector(state => ({
    date: state.schedule.page.activeDate,
    gym: state.schedule.page.activeGym,
    _id: state.checkDialog.contact,
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
