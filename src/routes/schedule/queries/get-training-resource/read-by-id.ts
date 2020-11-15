import { useCallback } from 'react'
import { useApolloClient } from '@apollo/react-hooks'
import { loader } from 'graphql.macro'

import IResourceParams from './params'

import useRead from './read'

const TRAINING_RESOURCE_PARAMS = loader('./params.gql')

export const useReadById = () => {
  const client = useApolloClient()
  const read = useRead()

  const fn = useCallback(
    (_id: string) => {
      const res = client.readFragment<IResourceParams>({
        id: `TrainingResource:${_id}`,
        fragment: TRAINING_RESOURCE_PARAMS,
      })

      if (!res) {
        return null
      }

      return read(res.startTime, res.resource._id, res.training.date)
    }, [read, client]
  )

  return fn
}

export default useReadById
