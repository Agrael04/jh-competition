import React from 'react'
import { useSelector } from 'store'
import { useMutation } from '@apollo/react-hooks'
import { loader } from 'graphql.macro'

import { updateQuery, createUpdater } from 'utils/apollo-cache-updater'

const CREATE_TRAINING_PASS = loader('./mutation.gql')
const GET_CONTACT_DETAILS = loader('../get-contract-details/query.gql')

const useCreateTrainingPass = () => {
  const [createTrainingPass] = useMutation(CREATE_TRAINING_PASS)
  const variables = useSelector(state => ({
    date: state.schedule.page.activeDate,
    gym: state.schedule.page.activeGym,
    _id: state.checkDialog.contact,
  }))

  const { data } = useSelector(state => ({
    data: state.checkDialog.passForm,
  }))

  const mutate = React.useCallback(
    () => {
      if (!data) {
        return
      }

      return createTrainingPass({
        variables: { data },
        update: (client, { data }) => {
          const boundUpdateCachedQuery = updateQuery(client)
          const updater = createUpdater('trainingPasss', data.insertOneTrainingPass)

          boundUpdateCachedQuery({
            query: GET_CONTACT_DETAILS,
            variables,
            updater,
          })
        },
      })
    },
    [createTrainingPass, data, variables]
  )

  return mutate
}

export default useCreateTrainingPass
