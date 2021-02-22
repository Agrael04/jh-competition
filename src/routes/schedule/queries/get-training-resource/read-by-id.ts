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
    (_id?: string) => {
      if (!_id) {
        return null
      }

      const res = client.readFragment<IResourceParams>({
        id: `NewTraining:${_id}`,
        fragment: TRAINING_RESOURCE_PARAMS,
      })

      if (!res) {
        return null
      }

      const r = read(res.startTime, res.resource._id, res.date)

      return r
    }, [read, client]
  )

  return fn
}

export default useReadById
