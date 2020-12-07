import { useCallback } from 'react'
import { useMutation } from '@apollo/react-hooks'
import { loader } from 'graphql.macro'

import { useSelector } from 'store'

import { ITrainingPassForm } from 'interfaces/training-pass'

import { ApolloCache } from '@apollo/client'
import { updateQuery, createUpdater } from 'utils/apollo-cache-updater'

const CREATE_TRAINING_PASS = loader('./mutation.gql')

const GET_TRAINING_PASSES = loader('../get-training-passes/query.gql')

export const updateCacheOnCreate = (variables: any) => (client: ApolloCache<any>, { data }: any) => {
  const boundUpdateCachedQuery = updateQuery(client)
  const updater = createUpdater('trainingPasss', data.insertOneTrainingPass)

  boundUpdateCachedQuery({
    query: GET_TRAINING_PASSES,
    variables,
    updater,
  })
}

const useCreateTrainingPass = () => {
  const variables = useSelector(state => ({
    _id: state.checkDialog.params.contact?.link,
  }))
  const [createTrainingPass] = useMutation(CREATE_TRAINING_PASS)

  const mutate = useCallback(
    (data: ITrainingPassForm) => {
      if (!data) {
        return
      }

      return createTrainingPass({
        variables: { data },
        update: updateCacheOnCreate(variables),
      })
    },
    [createTrainingPass, variables]
  )

  return mutate
}

export default useCreateTrainingPass
